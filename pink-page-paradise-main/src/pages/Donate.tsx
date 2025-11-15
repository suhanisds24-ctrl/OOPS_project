import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface Donation {
  id: string;
  bookTitle: string;
  donorName: string;
  condition: string;
  notes: string;
  date: string;
}

const Donate = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [bookTitle, setBookTitle] = useState("");
  const [donorName, setDonorName] = useState("");
  const [condition, setCondition] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const savedDonations = localStorage.getItem("donations");
    if (savedDonations) {
      setDonations(JSON.parse(savedDonations));
    }
  }, []);

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bookTitle || !donorName || !condition) {
      toast({
        title: "Missing Information",
        description: "Please fill in required fields",
        variant: "destructive",
      });
      return;
    }

    const newDonation: Donation = {
      id: Date.now().toString(),
      bookTitle,
      donorName,
      condition,
      notes,
      date: new Date().toLocaleDateString(),
    };

    const updatedDonations = [newDonation, ...donations];
    setDonations(updatedDonations);
    localStorage.setItem("donations", JSON.stringify(updatedDonations));

    setBookTitle("");
    setDonorName("");
    setCondition("");
    setNotes("");

    toast({
      title: "Thank You! 💝",
      description: "Your donation has been recorded",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-center">
            Donate Books 💝
          </h1>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Share the gift of reading with others
          </p>

          <div className="bg-card rounded-3xl shadow-lg p-8 mb-12 border border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Book Donation Form</h2>
            <form onSubmit={handleDonate} className="space-y-4">
              <Input
                placeholder="Book Title *"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                className="rounded-xl"
              />
              <Input
                placeholder="Your Name *"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="rounded-xl"
              />
              <Input
                placeholder="Book Condition (e.g., Like New, Good, Fair) *"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="rounded-xl"
              />
              <Textarea
                placeholder="Additional notes (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="rounded-xl"
              />
              <Button type="submit" className="w-full rounded-xl">
                Submit Donation 📚
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Recent Donations</h2>
            {donations.length === 0 ? (
              <div className="text-center py-12 bg-secondary rounded-2xl">
                <p className="text-muted-foreground text-lg">
                  No donations yet. Be the first to give! 🌸
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {donations.map((donation) => (
                  <Card key={donation.id} className="rounded-2xl border-border hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xl">{donation.bookTitle}</CardTitle>
                      <CardDescription>
                        Donated by {donation.donorName} on {donation.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                          {donation.condition}
                        </div>
                        {donation.notes && (
                          <p className="text-muted-foreground text-sm mt-2">{donation.notes}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Donate;
