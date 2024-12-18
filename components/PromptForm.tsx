
"use client";
import * as React from "react"

import { useChatLogic } from "../hooks/useChatLogic";
import { useLocalStorage } from "../hooks/useLocalStorage";
import ChatHistory from "./ChatHistory";
import InputForm from "./InputForm";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BadgeInfo, EllipsisVertical, House, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";


export default function PromptForm() {

    const { prompt, setPrompt, responses, setResponses, loading, handleSubmit } = useChatLogic();

    useLocalStorage("chatHistory", responses, setResponses);

    const router = useRouter();

    const handleNavigateToAbout = () => {
        router.push("/about");
    };

    return (
        <div className="w-full mx-auto mt-10 p-6 max-w-4xl overflow-hidden">
            <span
                className="absolute top-4 right-2 transform -translate-x-1/2"

            >
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <EllipsisVertical className="text-[#bbbbbb]" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#16161e] border-none">
                        <DropdownMenuLabel className="text-muted-foreground">Settings</DropdownMenuLabel>
                        <DropdownMenuSeparator />


                        <DropdownMenuCheckboxItem
                            className="text-muted-foreground hover:bg-gray-700 flex gap-2"
                            onClick={handleNavigateToAbout}
                        >
                            <BadgeInfo />About
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem className="text-destructive hover:bg-gray-700 flex gap-2"
                            onClick={() => setResponses([])}
                        >
                            <Trash2 /> Clear chat
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </span>

            {/* Flex container for chat history, using flex-col-reverse for bottom-to-top message flow */}
            <div className="space-y-4 overflow-y-auto max-h-96 custom-scrollbar flex flex-col-reverse">
                <ChatHistory responses={responses} loading={loading} />
            </div>


            <InputForm prompt={prompt} setPrompt={setPrompt} loading={loading} handleSubmit={handleSubmit} />




        </div>
    );
}












