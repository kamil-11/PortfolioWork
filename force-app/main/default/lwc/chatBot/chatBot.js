import { LightningElement, track } from 'lwc';

export default class ChatBot extends LightningElement {
    @track messages = [
        { id: 1, text: 'Hi! I\'m your Salesforce Support Bot. How can I help?', sender: 'bot' }
    ];
    userInput = '';

    handleInput(event) {
        this.userInput = event.target.value;
    }

    sendMessage() {
        const input = this.userInput.trim();
        if (!input) return;

        // Add user message
        this.messages = [...this.messages, {
            id: this.messages.length + 1,
            text: input,
            sender: 'user'
        }];

        // Bot response
        let response = this.getBotResponse(input.toLowerCase());
        this.messages = [...this.messages, {
            id: this.messages.length + 2,
            text: response,
            sender: 'bot'
        }];

        this.userInput = '';
    }

    getBotResponse(input) {
        if (input.includes('salesforce')) {
            return 'Salesforce is a cloud-based CRM platform.';
        } else if (input.includes('reset') && input.includes('password')) {
            return 'To reset your password, click "Forgot Password" on the login page.';
        } else if (input.includes('contact') && input.includes('support')) {
            return 'You can contact support via support.salesforce.com.';
        } else {
            return 'Sorry, I didn’t understand that. Try asking something else!';
        }
    }
}
