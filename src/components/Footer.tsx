import { useState } from 'react';
import { Send, Mail, MessageSquare, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

/**
 * Footer Component with Feedback Form
 * Features: Contact form, terms & conditions, responsive design
 */
const Footer = () => {
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFeedbackForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!feedbackForm.name || !feedbackForm.email || !feedbackForm.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    console.log('Feedback submitted:', feedbackForm);
    
    toast({
      title: "Feedback Sent!",
      description: "Thank you for your feedback. We'll get back to you soon.",
    });

    // Reset form
    setFeedbackForm({ name: '', email: '', message: '' });
  };

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Team', href: '#team' },
      { name: 'Careers', href: '#careers' },
      { name: 'Contact', href: '#contact' }
    ],
    resources: [
      { name: 'Blog', href: '#blog' },
      { name: 'Reviews', href: '#reviews' },
      { name: 'Buying Guides', href: '#guides' },  
      { name: 'Tech News', href: '#news' }
    ],
    legal: [
      { name: 'Terms & Conditions', href: '#terms' },
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'Affiliate Disclosure', href: '#affiliate' }
    ]
  };

  return (
    <footer className="bg-muted/30 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Feedback Form */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <MessageSquare className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold">Share Your Feedback</h3>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Help us improve Techaurex! We value your thoughts and suggestions.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={feedbackForm.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={feedbackForm.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="message">Feedback</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={feedbackForm.message}
                  onChange={handleInputChange}
                  placeholder="Tell us what you think..."
                  rows={4}
                  className="mt-1"
                />
              </div>

              <Button type="submit" className="btn-primary w-full sm:w-auto">
                <Send className="h-4 w-4 mr-2" />
                Send Feedback
              </Button>
            </form>
          </div>

          {/* Links and Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <a href="/" className="font-semibold text-foreground hover:text-primary transition-colors">Techaurex</a>
            </div>

            <p className="text-sm text-muted-foreground text-center md:text-right">
              © 2024 Techaurex. All rights reserved. 
              <br className="md:hidden" />
              <span className="inline-flex items-center space-x-1 mt-1 md:mt-0 md:ml-2">
                <FileText className="h-3 w-3" />
                <a href="#terms" className="hover:text-primary transition-colors">
                  Terms & Conditions
                </a>
                <span className="mx-2">•</span>
                <a href="#reviews" className="hover:text-primary transition-colors">
                  Reviews Policy
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;