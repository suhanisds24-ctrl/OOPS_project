import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface Poem {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

const Knowledge = () => {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const savedPoems = localStorage.getItem("poems");
    if (savedPoems) {
      setPoems(JSON.parse(savedPoems));
    }
  }, []);

  const handlePostPoem = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content || !author) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const newPoem: Poem = {
      id: Date.now().toString(),
      title,
      content,
      author,
      date: new Date().toLocaleDateString(),
    };

    const updatedPoems = [newPoem, ...poems];
    setPoems(updatedPoems);
    localStorage.setItem("poems", JSON.stringify(updatedPoems));

    setTitle("");
    setContent("");
    setAuthor("");

    toast({
      title: "Poetry Posted! ✍️",
      description: "Your beautiful words have been shared",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-center">
            Poetry Corner ✨
          </h1>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Share your heart through verse
          </p>

          <div className="bg-card rounded-3xl shadow-lg p-8 mb-12 border border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Post Your Poetry</h2>
            <form onSubmit={handlePostPoem} className="space-y-4">
              <Input
                placeholder="Poem Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-xl"
              />
              <Input
                placeholder="Your Name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="rounded-xl"
              />
              <Textarea
                placeholder="Write your poem here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px] rounded-xl"
              />
              <Button type="submit" className="w-full rounded-xl">
                Share Poetry ✨
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Published Poems</h2>
            {poems.length === 0 ? (
              <div className="text-center py-12 bg-secondary rounded-2xl">
                <p className="text-muted-foreground text-lg">
                  No poems yet. Be the first to share your words! 🌸
                </p>
              </div>
            ) : (
              poems.map((poem) => (
                <Card key={poem.id} className="rounded-2xl border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-2xl mb-2">{poem.title}</CardTitle>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>by {poem.author}</span>
                      <span>{poem.date}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap text-foreground leading-relaxed italic">
                      {poem.content}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Knowledge;
