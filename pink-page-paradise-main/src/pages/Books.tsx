import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { FileText } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  pdfUrl?: string;
}

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  useEffect(() => {
    const savedBooks = localStorage.getItem("books");
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  }, []);

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !author || !genre) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    let pdfUrl = "";
    if (pdfFile) {
      // Convert PDF to base64 for local storage
      const reader = new FileReader();
      reader.onloadend = () => {
        pdfUrl = reader.result as string;
        saveBook(pdfUrl);
      };
      reader.readAsDataURL(pdfFile);
      return;
    }
    saveBook(pdfUrl);
  };

  const saveBook = (pdfUrl: string) => {
    const newBook: Book = {
      id: Date.now().toString(),
      title,
      author,
      genre,
      pdfUrl,
    };

    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));

    const bookTitle = title;
    setTitle("");
    setAuthor("");
    setGenre("");
    setPdfFile(null);

    toast({
      title: "Book Added! 📚",
      description: `${bookTitle} has been added to your collection`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8 text-center">
            My Book Collection
          </h1>

          <div className="bg-card rounded-3xl shadow-lg p-8 mb-12 border border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Add a New Book</h2>
            <form onSubmit={handleAddBook} className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <Input
                  placeholder="Book Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="rounded-xl"
                />
                <Input
                  placeholder="Author Name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="rounded-xl"
                />
                <Input
                  placeholder="Genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Upload PDF (Optional)
                </label>
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                  className="rounded-xl"
                />
              </div>
              <Button type="submit" className="w-full rounded-xl">
                Add Book 📖
              </Button>
            </form>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {books.length === 0 ? (
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No books yet. Add your first book above! 🌸
                </p>
              </div>
            ) : (
              books.map((book) => (
                <Card key={book.id} className="rounded-2xl border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{book.title}</CardTitle>
                    <CardDescription>by {book.author}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between gap-2">
                      <div className="inline-block bg-secondary px-3 py-1 rounded-full text-sm text-foreground">
                        {book.genre}
                      </div>
                      {book.pdfUrl && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="rounded-xl"
                          onClick={() => window.open(book.pdfUrl, '_blank')}
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          PDF
                        </Button>
                      )}
                    </div>
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

export default Books;
