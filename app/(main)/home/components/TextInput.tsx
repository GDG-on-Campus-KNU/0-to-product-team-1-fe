"use client";

import React from "react";

import TextareaAutosize from "react-textarea-autosize";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";

interface TextInputProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  maxLength?: number;
}

export function TextInput({ text, setText, maxLength = 200 }: TextInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length > maxLength) {
      setText(inputValue.slice(0, maxLength));
    } else {
      setText(inputValue);
    }
  };
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup className="overflow-hidden rounded-2xl border border-border-disabled bg-muted shadow-sm transition-all focus-within:border-gray-300! focus-within:ring-1 focus-within:ring-gray-100!">
        <TextareaAutosize
          data-slot="input-group-control"
          className="flex field-sizing-content min-h-20 w-full resize-none bg-transparent px-4 py-3 text-body-04 text-gray-700 outline-none placeholder:text-gray-400"
          placeholder="오늘의 상태를 간단히 기록해 보세요..."
          maxLength={maxLength}
          value={text}
          onChange={handleChange}
        />
        <InputGroupAddon
          align="block-end"
          className="flex w-full items-center justify-between p-2 pl-4"
        >
          <span className="text-label-04 text-gray-400">
            {text.length}/{maxLength}자
          </span>

          <InputGroupButton
            className="rounded-xl bg-gray-600 px-5 text-(length:--text-label-02) text-white transition-colors hover:bg-gray-700 hover:text-white"
            size="sm"
          >
            기록하기
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
