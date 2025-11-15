import Navigation from "@/components/Navigation";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              Welcome to BookHaven 📖
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Your cozy corner for books, eBooks, poetry, and sharing knowledge
            </p>
          </div>
          
          <div className="bg-card rounded-3xl shadow-lg p-8 md:p-12 border border-border">
            <p className="text-lg text-foreground leading-relaxed">
              Discover a world of stories, share your favorite reads, post beautiful poetry, 
              and contribute to our growing library. Whether you're here to browse, donate, 
              or simply get inspired, we're glad you're here. 🌸
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-secondary rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Browse Books</h3>
              <p className="text-muted-foreground">Explore our collection and add your favorites</p>
            </div>
            <div className="bg-secondary rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-3">✍️</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Share Poetry</h3>
              <p className="text-muted-foreground">Express yourself through beautiful words</p>
            </div>
            <div className="bg-secondary rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-3">💝</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Donate Books</h3>
              <p className="text-muted-foreground">Share knowledge with the community</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
