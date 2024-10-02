import textToSpeech from "@google-cloud/text-to-speech";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import util from "util";

const client = new textToSpeech.TextToSpeechClient();

export async function POST(req) {
  try {
    const { text, id } = await req.json();

    if (!text) {
      return NextResponse.json(
        {
          error: "Text is required.",
        },
        {
          status: 400,
        }
      );
    }

    const request = {
      input: { text },
      voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
      audioConfig: { audioEncoding: "MP3" },
    };

    const [response] = await client.synthesizeSpeech(request);

    const filePath = path.join(
      process.cwd(),
      "public",
      `${id || "output"}.mp3`
    );

    const writeFile = util.promisify(fs.writeFile);
    await writeFile(filePath, response.audioContent, "binary");

    return NextResponse.json({
      Result: "Success",
      fileUrl: `/public/${id || "output"}.mp3`,
    });
  } catch (error) {
    console.error("Error during text-to-speech synthesis:", error);

    return NextResponse.json(
      {
        error: "Text-to-speech synthesis failed.",
      },
      {
        status: 500,
      }
    );
  }
}
