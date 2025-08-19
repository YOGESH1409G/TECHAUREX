import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import heroGadgets from '@/assets/hero-gadgets.jpg';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="hero-gradient">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <Badge variant="secondary" className="mb-3">Our Story</Badge>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">Why we built Techaurex</h1>
              <p className="text-muted-foreground mt-4 text-lg">
                Techaurex was born from a simple idea: technology should feel human. We felt the noise—specs, hype, confusing choices—and wanted to build a place that puts people first. Honest reviews, clear guidance, and the confidence to choose the right gadget for your life.
              </p>
              <p className="text-muted-foreground mt-3">
                Every article we write is a promise—to save you time, simplify the complex, and help you buy smarter. That\'s our north star.
              </p>
              <div className="mt-6">
                <Button asChild className="btn-primary"><a href="/">Explore Reviews</a></Button>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-[var(--shadow-card)]">
              <img src={heroGadgets} alt="Techaurex" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="card-modern p-6">
            <h3 className="font-semibold text-xl">Our Mission</h3>
            <p className="text-muted-foreground mt-3">Make tech decisions effortless with trustworthy reviews, transparent pricing, and practical recommendations.</p>
          </div>
          <div className="card-modern p-6">
            <h3 className="font-semibold text-xl">Our Promise</h3>
            <p className="text-muted-foreground mt-3">No jargon walls. No salesy fluff. Just useful insights crafted for real people.</p>
          </div>
          <div className="card-modern p-6">
            <h3 className="font-semibold text-xl">Our Community</h3>
            <p className="text-muted-foreground mt-3">Techaurex grows with you—your feedback, questions, and ideas shape what we build next.</p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold">The heart behind Techaurex</h2>
            <p className="text-muted-foreground mt-4">
              This platform started as a personal mission: to help friends and family avoid costly mistakes when buying gadgets. That small act of help turned into Techaurex—a place where guidance meets empathy, and decisions become easier.
            </p>
            <p className="text-muted-foreground mt-3">
              We are obsessed with clarity. We test, we compare, we simplify. Because the right tech doesn\'t just save money—it elevates your everyday.
            </p>
          </div>

          <div className="card-modern p-6 text-center">
            <div className="mx-auto w-28 h-28 rounded-full overflow-hidden bg-muted">
                  <img src="/founder.jpg" alt="Hari Om Gupta" className="w-full h-full object-cover" />
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Hari Om Gupta</h3>
              <p className="text-muted-foreground text-sm">Founder, Techaurex</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;


