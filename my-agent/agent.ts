import "dotenv/config";
import { FunctionTool, LlmAgent } from "@google/adk";
import { z } from "zod";

const getCurrentTime = new FunctionTool({
  name: "getCurrentTime",
  description: "Returns the actual current time in a specified city",

  parameters: z.object({
    city: z.string().describe("City name"),
  }),

  execute: async ({ city }) => {
    try {
      console.log(`fetching time in city ${city}`);
      const timezoneMap: Record<string, string> = {
        hyderabad: "Asia/Kolkata",
        bengaluru: "Asia/Kolkata",
        bangalore: "Asia/Kolkata",
        chennai: "Asia/Kolkata",
        delhi: "Asia/Kolkata",
        mumbai: "Asia/Kolkata",
        london: "Europe/London",
        paris: "Europe/Paris",
        tokyo: "Asia/Tokyo",
        newyork: "America/New_York",
        dubai: "Asia/Dubai",
      };

      const key = city.toLowerCase().replace(/\s+/g, "");
      const timezone = timezoneMap[key];
      console.log(`Timezone: $${timezone}`);
      if (!timezone) {
        return `Sorry, I don't know the timezone for ${city}`;
      }

      const currentTime = new Intl.DateTimeFormat("en-IN", {
        timeZone: timezone,
        dateStyle: "full",
        timeStyle: "long",
      }).format(new Date());
      console.log(`current time: ${currentTime}`);
      return `Current time in ${city} is ${currentTime}`;
    } catch (error) {
      console.log(`Error Message: ${error?.message}`);
      return `Failed to get time for ${city}`;
    }
  },
});

export const rootAgent = new LlmAgent({
  name: "hello_time_agent",
  model: "gemini-2.5-flash",

  instruction: `
You are a helpful assistant.

IMPORTANT:
If the user asks for current time, date, or timezone,
you MUST use getCurrentTime tool.

Do not guess.
Do not answer from memory.
Always call the tool first.
`,

  tools: [getCurrentTime],
});

// import { LlmAgent } from "@google/adk";

// export const rootAgent = new LlmAgent({
//   name: "test_agent",
//   model: "gemini-2.5-flash",
//   instruction: "You are a helpful assistant. Reply briefly.",
// });
