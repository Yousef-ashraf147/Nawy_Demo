"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; 
import { Button } from "@/components/ui/button";


//Sample agents array
const agents = [
  { name: "Youssef Ashraf", email: "YousefAshraf147@gmail.com", phone: "+20 123 456 789" },
  { name: "Sarah Saeed", email: "sarah.saeed@gmail.com", phone: "+20 987 654 321" },
];

export default function ContactAgents() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white hover:bg-blue-700">
          Contact Agent
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Contact Agents</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {agents.map((agent) => (
            <div key={agent.email} className="p-4 border rounded-lg bg-gray-50">
              <h3 className="font-semibold text-lg">{agent.name}</h3>
              <p className="text-gray-600">Email: {agent.email}</p>
              <p className="text-gray-600">Phone: {agent.phone}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
