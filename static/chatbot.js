const messagesArea = document.getElementById("messagesArea");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const typingIndicator = document.getElementById("typingIndicator");

// Auto-resize textarea
messageInput.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = Math.min(this.scrollHeight, 120) + "px";
});

// Send message on Enter (but allow Shift+Enter for new lines)
messageInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

function sendExampleMessage(element) {
  const message = element.textContent.trim();
  messageInput.value = message;
  sendMessage();
}

function sendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;

  // Clear welcome message if it exists
  const welcomeMessage = document.querySelector(".welcome-message");
  if (welcomeMessage) {
    welcomeMessage.remove();
  }

  // Add user message
  addMessage(message, "user");

  // Clear input
  messageInput.value = "";
  messageInput.style.height = "auto";

  // Show typing indicator
  showTypingIndicator();

  // Simulate AI response
  setTimeout(
    () => {
      hideTypingIndicator();
      generateAIResponse(message);
    },
    1500 + Math.random() * 1000,
  );
}

function addMessage(content, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;

  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  avatar.textContent = sender === "user" ? "U" : "AI";

  const messageContent = document.createElement("div");
  messageContent.className = "message-content";
  messageContent.textContent = content;

  messageDiv.appendChild(avatar);
  messageDiv.appendChild(messageContent);

  messagesArea.appendChild(messageDiv);
  messagesArea.scrollTop = messagesArea.scrollHeight;
}

function showTypingIndicator() {
  typingIndicator.classList.add("show");
  messagesArea.scrollTop = messagesArea.scrollHeight;
}

function hideTypingIndicator() {
  typingIndicator.classList.remove("show");
}

function generateAIResponse(userMessage) {
  // Simulate AI processing and response generation
  const responses = [
    `I understand you want to "${userMessage}". Let me break this down into a structured workflow:

1. **Intent Analysis**: I've identified key goals and constraints
2. **Task Decomposition**: Breaking down into actionable steps
3. **Dependency Mapping**: Organizing tasks in optimal sequence
4. **Workflow Generation**: Creating executable DAG structure

Here's your compiled workflow:
• Market Research & Analysis
• Regulatory Compliance Check  
• Resource Planning & Allocation
• Implementation & Monitoring

Would you like me to elaborate on any specific step or generate the technical workflow specification?`,

    `Based on your intent: "${userMessage}", I've compiled a comprehensive workflow:

**Phase 1: Planning & Analysis**
- Stakeholder identification
- Requirements gathering
- Risk assessment

**Phase 2: Implementation**
- Resource allocation
- Task execution
- Progress monitoring

**Phase 3: Validation & Deployment**
- Quality assurance
- Compliance verification
- Go-live preparation

This workflow includes 12 interconnected tasks with clear dependencies. Would you like me to export this as a DAG specification or provide more details on specific phases?`,

    `Excellent! I've processed your intent: "${userMessage}" and generated an executable workflow:

🎯 **Goals Identified**: Primary objectives and success criteria
⚡ **Constraints Mapped**: Resource, time, and compliance limitations  
📋 **Tasks Generated**: 8 actionable workflow steps
🔗 **Dependencies Resolved**: Optimal execution sequence

**Workflow Summary:**
→ Preparation & Setup (2-3 days)
→ Core Implementation (1-2 weeks)  
→ Testing & Validation (3-5 days)
→ Deployment & Monitoring (Ongoing)

The workflow is now ready for execution by your orchestration platform. Would you like me to generate the technical specification or modify any aspects?`,
  ];

  const randomResponse =
    responses[Math.floor(Math.random() * responses.length)];
  addMessage(randomResponse, "bot");
}

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  messageInput.focus();
});
