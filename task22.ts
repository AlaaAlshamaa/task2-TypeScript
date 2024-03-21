class Contact {
    name: string;
    email: string;
    phone: string;
    group?: string;
    constructor(name: string, email: string, phone: string , group?: string) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.group = group
    }
}

class AddressBook {
    contacts: Contact[] = [];
    addContact: (contact: Contact) => void = (contact) => {
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(contact.email)) {
            throw new Error("Invalid email format");
        }
        // Name validation (example - check for empty name)
        if (!contact.name || contact.name.trim() === "") {
            throw new Error("Name cannot be empty");
        }
        // You can add further validations for phone number format, etc.
        this.contacts.push(contact);
    }
    findContactByName: (name: string) => Contact | undefined = (name) => {
        return this.contacts.find((contact :Contact) => contact.name === name);
    }
    filterByGroup: (group: string) =>  Contact[] = (group) => {
        return this.contacts.filter((contact :Contact) => contact.group === group);
    }
    sortByName :() => void = () => {
        this.contacts.sort((a:Contact, b:Contact) => a.name.localeCompare(b.name));
    }
    // New functionalities:
    // 1. Validate various contact properties on addition (already implemented)
    // 2. Search contacts by name (partial match)
    searchContacts(searchTerm: string): Contact[] {
        const normalizedSearchTerm: string = searchTerm.toLowerCase();
        return this.contacts.filter((contact:Contact) =>
            contact.name.toLowerCase().includes(normalizedSearchTerm)
        );
    }
    printContacts: ()=> void = () => {
        for (const contact of this.contacts) {
            console.log(`Name: ${contact.name}`);
            console.log(`Email: ${contact.email}`);
            console.log(`Phone: ${contact.phone}`);
            console.log("-----");
        }
    }
}

const addressBook: AddressBook = new AddressBook();
const contact1: Contact = new Contact("John Doe", "johndoe@example.com", "123-456-7890");
const contact2: Contact = new Contact("Alice Smith", "alice.smith@invalid", "456-789-0123"); // Invalid email
const contact3: Contact = new Contact("", "valid@email.com", "789-012-3456"); // Empty name
const contact4: Contact = new Contact("Alaa Shamaa", "alaa@example.com", "123-456-7890");
addressBook.addContact(contact1);
addressBook.addContact(contact4);
try {
    addressBook.addContact(contact2); // This will throw an error (invalid email)
    addressBook.addContact(contact3); // This will throw an error (empty name)
} catch (error) {
    console.error("Error adding contact:", error.message);
}
console.log("Contacts:");
addressBook.printContacts();
// Example usage of new search functionality
const searchResults: Contact[] = addressBook.searchContacts("john");
console.log("Search results (name containing 'john'):");
searchResults.forEach((contact) => console.log(`  - ${contact.name}`));

