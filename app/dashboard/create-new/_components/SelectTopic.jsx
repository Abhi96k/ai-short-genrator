"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function SelectTopic({ onUserSelect }) {
  const options = [
    "Custom Prompt",
    "Random AI Story",
    "Scary Story",
    "Historical Facts",
    "Bedtime Story",
    "Motivational Story",
    "Fun Facts",
  ];

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (value) => {
    setSelectedOption(value);

    if (value !== "Custom Prompt") {
      onUserSelect("topic", value);
    }
  };

  const handleTextareaChange = (e) => {
    onUserSelect("topic", e.target.value);
  };

  return (
    <div className="mt-10">
      <h2 className="font-bold text-2xl text-primary">Content</h2>
      <p className="text-gray-500">What is the topic of your video?</p>

      <Select onValueChange={handleSelectChange}>
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
          {options.map((item, index) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedOption === "Custom Prompt" && (
        <Textarea
          className="mt-3"
          onChange={handleTextareaChange}
          placeholder="Write the prompt on which you want to generate the video"
        />
      )}
    </div>
  );
}

export default SelectTopic;
