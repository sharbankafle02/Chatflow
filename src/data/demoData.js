export const currentUser = {
  id: "me",
  name: "Alex Morgan",
  username: "alexmorgan",
  avatar: "https://i.pravatar.cc/120?img=12",
  status: "Available",
};

export const initialConversations = [
  {
    id: "c1", type: "direct", name: "Sarah Wilson", avatar: "https://i.pravatar.cc/120?img=47",
    online: true, unread: 2, lastMessage: "That sounds great! Let's do it 🚀", time: "2:42 PM",
    members: ["me", "u1"], pinned: true
  },
  {
    id: "c2", type: "group", name: "Product Team", avatar: "",
    online: false, unread: 0, lastMessage: "Marcus: The new design is ready", time: "1:18 PM",
    members: ["me", "u2", "u3", "u4"], pinned: true, color: "bg-violet-500"
  },
  {
    id: "c3", type: "direct", name: "James Rodriguez", avatar: "https://i.pravatar.cc/120?img=13",
    online: true, unread: 0, lastMessage: "I'll send you the files shortly.", time: "11:36 AM",
    members: ["me", "u2"]
  },
  {
    id: "c4", type: "group", name: "Weekend Plans", avatar: "",
    online: false, unread: 3, lastMessage: "Emma: Who's joining us?", time: "Yesterday",
    members: ["me", "u3", "u4"], color: "bg-emerald-500"
  },
  {
    id: "c5", type: "direct", name: "Emma Thompson", avatar: "https://i.pravatar.cc/120?img=44",
    online: false, unread: 0, lastMessage: "Thank you so much!", time: "Yesterday",
    members: ["me", "u3"]
  },
  {
    id: "c6", type: "direct", name: "Daniel Kim", avatar: "https://i.pravatar.cc/120?img=59",
    online: true, unread: 0, lastMessage: "Are we still meeting tomorrow?", time: "Mon",
    members: ["me", "u4"]
  }
];

export const initialMessages = {
  c1: [
    { id: 1, sender: "u1", text: "Hey Alex! 👋 How's the new project going?", time: "2:30 PM", read: true },
    { id: 2, sender: "me", text: "Hey Sarah! It's going really well. Just polishing the final UI details.", time: "2:34 PM", read: true },
    { id: 3, sender: "u1", text: "I saw the latest designs. They look amazing! Love the new direction.", time: "2:38 PM", read: true },
    { id: 4, sender: "me", text: "Thank you! Your feedback helped a lot. We should review everything together.", time: "2:40 PM", read: true },
    { id: 5, sender: "u1", text: "That sounds great! Let's do it 🚀", time: "2:42 PM", read: false }
  ],
  c2: [
    { id: 1, sender: "u2", text: "Good morning team! I've uploaded the latest product brief.", time: "10:02 AM", read: true },
    { id: 2, sender: "u3", text: "Thanks Marcus. I'll review it before our sync.", time: "10:15 AM", read: true },
    { id: 3, sender: "me", text: "Perfect. I'll prepare the frontend updates for the meeting.", time: "10:22 AM", read: true },
    { id: 4, sender: "u2", text: "The new design is ready", time: "1:18 PM", read: true }
  ],
  c3: [
    { id: 1, sender: "u2", text: "Hey, could you share the component structure?", time: "11:20 AM", read: true },
    { id: 2, sender: "me", text: "Sure! I'll organize the reusable components and send them over.", time: "11:28 AM", read: true },
    { id: 3, sender: "u2", text: "I'll send you the files shortly.", time: "11:36 AM", read: true }
  ],
  c4: [
    { id: 1, sender: "u3", text: "Hey everyone! Any plans for this weekend?", time: "Yesterday", read: true },
    { id: 2, sender: "u4", text: "We should go hiking if the weather is good 🌤️", time: "Yesterday", read: true },
    { id: 3, sender: "u3", text: "Who's joining us?", time: "Yesterday", read: false }
  ],
  c5: [{ id: 1, sender: "u3", text: "Thank you so much!", time: "Yesterday", read: true }],
  c6: [{ id: 1, sender: "u4", text: "Are we still meeting tomorrow?", time: "Mon", read: true }]
};

export const users = {
  u1: { id: "u1", name: "Sarah Wilson", avatar: "https://i.pravatar.cc/120?img=47", online: true },
  u2: { id: "u2", name: "James Rodriguez", avatar: "https://i.pravatar.cc/120?img=13", online: true },
  u3: { id: "u3", name: "Emma Thompson", avatar: "https://i.pravatar.cc/120?img=44", online: false },
  u4: { id: "u4", name: "Daniel Kim", avatar: "https://i.pravatar.cc/120?img=59", online: true }
};
