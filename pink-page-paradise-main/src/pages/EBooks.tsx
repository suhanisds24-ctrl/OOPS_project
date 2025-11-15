import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const eBooksData = {
  Fiction: [
    { title: "The Enchanted Garden", author: "Emma Rose", description: "A magical tale of discovery and wonder", pdfUrl: "#" },
    { title: "Moonlight Memories", author: "Sarah Chen", description: "Stories that dance between reality and dreams", pdfUrl: "#" },
    { title: "The Last Letter", author: "James Wilson", description: "A journey through time and love", pdfUrl: "#" },
  ],
  Motivation: [
    { title: "Rise & Shine", author: "Michael Torres", description: "Daily inspiration for your best life", pdfUrl: "#" },
    { title: "Unstoppable You", author: "Lisa Anderson", description: "Unleash your inner champion", pdfUrl: "#" },
    { title: "The Power Within", author: "David Kumar", description: "Discover your true potential", pdfUrl: "#" },
  ],
  "Self-Help": [
    { title: "Mindful Moments", author: "Dr. Rachel Green", description: "Finding peace in everyday life", pdfUrl: "#" },
    { title: "The Confidence Code", author: "Amanda Brooks", description: "Build unshakeable self-belief", pdfUrl: "#" },
    { title: "Healing Hearts", author: "Dr. Thomas Lee", description: "A guide to emotional wellness", pdfUrl: "#" },
  ],
};

const EBooks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-center">
            Digital Library 💻
          </h1>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Explore our curated collection of eBooks across various genres
          </p>

          <Tabs defaultValue="Fiction" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-secondary rounded-2xl p-2">
              <TabsTrigger value="Fiction" className="rounded-xl">Fiction</TabsTrigger>
              <TabsTrigger value="Motivation" className="rounded-xl">Motivation</TabsTrigger>
              <TabsTrigger value="Self-Help" className="rounded-xl">Self-Help</TabsTrigger>
            </TabsList>

            {Object.entries(eBooksData).map(([category, books]) => (
              <TabsContent key={category} value={category} className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {books.map((book, index) => (
                    <Card key={index} className="rounded-2xl border-border hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-xl">{book.title}</CardTitle>
                        <CardDescription>by {book.author}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{book.description}</p>
                        <div className="flex items-center justify-between gap-2">
                          <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                            {category}
                          </div>
                          <Button 
                            size="sm" 
                            className="rounded-xl"
                            onClick={() => window.open(book.pdfUrl, '_blank')}
                          >
                            <FileText className="w-4 h-4 mr-1" />
                            View PDF
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default EBooks;
