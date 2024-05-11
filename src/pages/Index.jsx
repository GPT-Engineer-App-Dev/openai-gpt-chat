import React, { useState } from "react";
import { Box, Button, Input, VStack, Text, useToast, HStack } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) {
      toast({
        title: "Empty message",
        description: "You can't send an empty message.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Simulating sending message
    const newMessage = { id: messages.length + 1, text: inputValue, sender: "user" };
    setMessages([...messages, newMessage]);

    // Simulate receiving a response
    const responseMessage = { id: messages.length + 2, text: `Echo: ${inputValue}`, sender: "bot" };
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, responseMessage]);
    }, 1500);

    setInputValue("");
  };

  return (
    <VStack spacing={4}>
      <Box w="100%" p={4} bg="gray.100" borderRadius="lg" maxH="70vh" overflowY="auto">
        {messages.map((msg) => (
          <Text key={msg.id} alignSelf={msg.sender === "user" ? "flex-end" : "flex-start"} bg={msg.sender === "user" ? "blue.200" : "green.200"} p={2} borderRadius="md">
            {msg.text}
          </Text>
        ))}
      </Box>
      <HStack w="100%">
        <Input placeholder="Type your message here..." value={inputValue} onChange={handleInputChange} />
        <Button colorScheme="blue" onClick={sendMessage} rightIcon={<FaPaperPlane />}>
          Send
        </Button>
      </HStack>
    </VStack>
  );
};

export default Index;
