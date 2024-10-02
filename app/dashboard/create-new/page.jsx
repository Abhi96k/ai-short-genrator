"use client";
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";

function CreateNew() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState([]);
  const [audioFileUrl, setAudioFileUrl] = useState();

  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    GetVideoScript();
  };

  const GetVideoScript = async () => {
    setLoading(true);
    try {
      const prompt =
        `Write a script to generate a ${formData.duration} story on the topic of ` +
        `${formData.topic}, along with an AI image prompt in a ` +
        `${formData.imagestyle} format for each scene. Provide the result in JSON format ` +
        `with imagePrompt and contextText as fields. No plain text.`;

      const result = await axios.post("/api/get-video-script", {
        prompt: prompt,
      });

      console.log(result.data); // Check API response structure
      if (
        result.data &&
        result.data.result &&
        Array.isArray(result.data.result.scenes)
      ) {
        setVideoScript(result.data.result.scenes);
        GenerateAudioFile(result.data.result.scenes);
      } else {
        console.error("Scenes data is missing in the response");
      }
    } catch (error) {
      console.error("Error fetching video script:", error);
    } finally {
      setLoading(false);
    }
  };

  const GenerateAudioFile = async (scenes) => {
    if (!scenes || scenes.length === 0) {
      console.error("No scenes available to generate audio");
      return;
    }

    let script = "";
    const id = uuidv4();

    scenes.forEach((scene) => {
      script += scene.contextText + " ";
    });

    await axios
      .post("/api/generate-audio", {
        text: script,
        id: id,
      })
      .then((response) => {
        console.log("Audio file generated successfully:", response.data);
        setAudioFileUrl(response.data.result);
        console.log("Audio file URL:", response.data.result);
      })
      .catch((error) => {
        console.error("Error generating audio file:", error);
      });

    console.log("Script for audio:", script);
  };

  return (
    <div className="md:px-20">
      <h1 className="font-bold text-4xl text-primary text-center">
        Create New
      </h1>
      <div className="mt-10 shadow-md p-10">
        {/* Select Topic */}
        <SelectTopic onUserSelect={onHandleInputChange} />

        {/* Select Style */}
        <SelectStyle onUserSelect={onHandleInputChange} />

        {/* Duration */}
        <SelectDuration onUserSelect={onHandleInputChange} />

        {/* Create Button */}
        <Button
          className="mt-10 w-full"
          onClick={onCreateClickHandler}
          disabled={loading}
        >
          Genrate Video
        </Button>
      </div>
      <CustomLoading loading={loading} />
    </div>
  );
}

export default CreateNew;
