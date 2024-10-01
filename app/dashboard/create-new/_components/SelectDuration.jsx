"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SelectDuration({ onUserSelect }) {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="mt-7">
      <h2 className="font-bold text-2xl text-primary">Duration</h2>
      <p className="text-gray-500">Select the Duration of the Video</p>

      <Select
        onValueChange={(value) => {
          setSelectedOption(value);
          onUserSelect && onUserSelect("duration", value);
        }}
      >
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Select Duration" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="30s">30 seconds</SelectItem>
          <SelectItem value="60s">60 seconds</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectDuration;
