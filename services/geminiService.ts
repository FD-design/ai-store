
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Initialize securely.
const ai = new GoogleGenAI({ apiKey });

export const generateAppDescription = async (appName: string, coreFunction: string, targetAudience: string): Promise<{description: string, features: string[]}> => {
  try {
    if (!apiKey) throw new Error("API Key not found");

    const prompt = `
      我正在一个类似 App Store 的 AI 工具市场上发布一个新应用。
      应用名称: ${appName}
      核心功能: ${coreFunction}
      目标受众: ${targetAudience}

      请帮我生成以下两部分内容 (请用 JSON 格式返回，不要包含 markdown 代码块标记)：
      1. description: 一段非常有吸引力、专业且令人兴奋的营销文案（约 150 字），突出颠覆性优势。
      2. features: 一个包含 4 个简短核心卖点的字符串数组 (Array<string>)，每个卖点不超过 15 个字。
      
      返回格式示例:
      {
        "description": "...",
        "features": ["...", "...", "...", "..."]
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || "{}";
    try {
        const json = JSON.parse(text);
        return {
            description: json.description || "无法生成描述。",
            features: json.features || []
        };
    } catch (e) {
        return {
            description: text,
            features: []
        };
    }

  } catch (error) {
    console.error("Gemini generation error:", error);
    return { description: "AI 生成功能需要有效的 API Key。请手动填写描述。", features: [] };
  }
};

export const suggestPricing = async (appName: string, category: string): Promise<string> => {
  try {
    if (!apiKey) throw new Error("API Key not found");
    
    const prompt = `基于应用名称 "${appName}" 和类别 "${category}"，请用**中文**建议一个定价模式（免费、一次性买断或订阅制）以及一个合理的价格点（人民币 CNY）。用一句话解释理由。`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    
    return response.text || "暂无定价建议。";
  } catch (e) {
    return "AI 定价建议不可用。";
  }
};