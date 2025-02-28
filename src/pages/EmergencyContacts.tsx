import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Users, Plus, Trash2, Edit, Save, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  isPrimary: boolean;
}

const EmergencyContacts: React.FC = () => {
  const { currentUser } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form state
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('');
  const [isPrimary, setIsPrimary] = useState(false);
  
  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setContacts(userData.emergencyContacts || []);
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching contacts:", error);
          setError('Failed to load emergency contacts');
          setLoading(false);
        }
      }
    };
    
    fetchContacts();
  }, [currentUser]);
  
  const resetForm = () => {
    setName('');
    setPhone('');
    setRelationship('');
    setIsPrimary(false);
    setIsAdding(false);
    setEditingId(null);
  };
  
  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) return;
    
    try {
      const newContact: Contact = {
        id: Date.now().toString(),
        name,
        phone,
        relationship,
        isPrimary
      };
      
      // If this is marked as primary, update other contacts to not be primary
      let updatedContacts = [...contacts];
      if (isPrimary) {
        updatedContacts = updatedContacts.map(contact => ({
          ...contact,
          isPrimary: false
        }));
      }
      
      // Add the new contact
      updatedContacts.push(newContact);
      
      // Update Firestore
      await updateDoc(doc(db, "users", currentUser.uid), {
        emergencyContacts: updatedContacts
      });
      
      setContacts(updatedContacts);
      setSuccess('Contact added successfully');
      resetForm();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error("Error adding contact:", error);
      setError('Failed to add contact');
      
      // Clear error message after 3 seconds
      setTimeout(() => setError(''), 3000);
    }
  };
  
  const handleEditContact = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser || !editingId) return;
    
    try {
      // If this is marked as primary, update other contacts to not be primary
      let updatedContacts = [...contacts];
      if (isPrimary) {
        updatedContacts = updatedContacts.map(contact => ({
          ...contact,
          isPrimary: contact.id === editingId ? true : false
        }));
      } else {
        updatedContacts = updatedContacts.map(contact => 
          contact.id === editingId 
            ? { ...contact, name, phone, relationship, isPrimary } 
            : contact
        );
      }
      
      // Update Firestore
      await updateDoc(doc(db, "users", currentUser.uid), {
        emergencyContacts: updatedContacts
      });
      
      setContacts(updatedContacts);
      setSuccess('Contact updated successfully');
      resetForm();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error("Error updating contact:", error);
      setError('Failed to update contact');
      
      // Clear error message after 3 seconds
      setTimeout(() => setError(''), 3000);
    }
  };
  
  const handleDeleteContact = async (id: string) => {
    if (!currentUser) return;
    
    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return;
    }
    
    try {
      const contactToDelete = contacts.find(contact => contact.id === id);
      if (!contactToDelete) return;
      
      const updatedContacts = contacts.filter(contact => contact.id !== id);
      
      // Update Firestore
      await updateDoc(doc(db, "users", currentUser.uid), {
        emergencyContacts: updatedContacts
      });
      
      setContacts(updatedContacts);
      setSuccess('Contact deleted successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error("Error deleting contact:", error);
      setError('Failed to delete contact');
      
      // Clear error message after 3 seconds
      setTimeout(() => setError(''), 3000);
    }
  };
  
  const startEditing = (contact: Contact) => {
    setName(contact.name);
    setPhone(contact.phone);
    setRelationship(contact.relationship);
    setIsPrimary(contact.isPrimary);
    setEditingId(contact.id);
    setIsAdding(false);
  };
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 bg-purple-700 text-white">
            <div className="flex items-center">
              <Users className="h-6 w-6 mr-2" />
              <h1 className="text-2xl font-bold">Emergency Contacts</h1>
            </div>
            <p className="mt-1 text-purple-100">
              Add contacts who will be notified in case of an emergency.
            </p>
          </div>
          
          {/* Alerts */}
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              {error}
            </div>
          )}
          
          {success && (
            <div className="p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
              {success}
            </div>
          )}
          
          <div className="p-6">
            {/* Add/Edit Contact Form */}
            {(isAdding || editingId) && (
              <div className="mb-8 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {editingId ? 'Edit Contact' : 'Add New Contact'}
                  </h3>
                  <button 
                    onClick={resetForm}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <form onSubmit={editingId ? handleEditContact : handleAddContact}>
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <div className="mt-1">
                        <input
                          type="tel"
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="relationship" className="block text-sm font-medium text-gray-700">
                        Relationship
                      </label>
                      <div className="mt-1">
                        <select
                          id="relationship"
                          value={relationship}
                          onChange={(e) => setRelationship(e.target.value)}
                          required
                          className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="">Select relationship</option>
                          <option value="Family">Family</option>
                          <option value="Friend">Friend</option>
                          <option value="Partner">Partner</option>
                          <option value="Colleague">Colleague</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <div className="flex items-center h-full mt-6">
                        <input
                          id="isPrimary"
                          type="checkbox"
                          checked={isPrimary}
                          onChange={(e) => setIsPrimary(e.target.checked)}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isPrimary" className="ml-2 block text-sm text-gray-700">
                          Set as primary emergency contact
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mr-3"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-purple-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      {editingId ? 'Update Contact' : 'Add Contact'}
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Contacts List */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium text-gray-900">Your Contacts</h2>
                {!isAdding && !editingId && (
                  <button
                    onClick={() => setIsAdding(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Contact
                  </button>
                )}
              </div>
              
              {loading ? (
                <p className="text-center py-4 text-gray-500">Loading contacts...</p>
              ) : contacts.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No contacts yet</h3>
                  <p className="text-gray-500 mb-4">Add emergency contacts who will be notified in case of an emergency.</p>
                  <button
                    onClick={() => setIsAdding(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Contact
                  </button>
                </div>
              ) : (
                <div className="overflow-hidden bg-white shadow sm:rounded-md">
                  <ul className="divide-y divide-gray-200">
                    {contacts.map((contact) => (
                      <li key={contact.id}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                <span className="text-purple-700 font-medium">{contact.name.charAt(0).toUpperCase()}</span>
                              </div>
                              <div className="ml-4">
                                <div className="flex items-center">
                                  <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                                  {contact.isPrimary && (
                                    <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                      Primary
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-500">{contact.phone}</p>
                              </div>
                            </div>
                            <div className="flex">
                              <button
                                onClick={() => startEditing(contact)}
                                className="text-gray-400 hover:text-gray-500 mr-3"
                              >
                                <Edit className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleDeleteContact(contact.id)}
                                className="text-red-400 hover:text-red-500"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-gray-500">
                                {contact.relationship}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Information Box */}
            <div className="mt-8 bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Important Information</h3>
              <p className="text-sm text-blue-700">
                Your emergency contacts will receive an SMS with your location and a distress message when you activate the SOS feature. Make sure to add at least one primary contact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;