import { useEffect, useState } from "react";
import { useItemStore } from "../store/useItemStore";
import ItemCard from "../components/items/ItemCard";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search, SlidersHorizontal, PackageX } from "lucide-react";

export default function BrowsePage() {
  const { items, fetchAllItems, loading } = useItemStore();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");

  useEffect(() => {
    fetchAllItems();
  }, []);

  const filtered = items.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "ALL" || item.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="min-h-screen bg-background text-foreground px-4 sm:px-8 py-8 sm:py-12 antialiased selection:bg-primary/10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="border-b border-border/60 pb-6 space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Browse Items</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Help reunite people with their lost belongings
          </p>
        </div>

        {/* Toolbar: Search and Filters Control */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-card/20 dark:bg-card/10 border border-border/40 p-3 sm:p-4 rounded-xl backdrop-blur-sm shadow-sm transition-all duration-300">
          
          {/* Search bar container */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
            <Input
              placeholder="Search by title, keywords or location..."
              className="pl-10 pr-4 bg-background/50 h-11 border-muted-foreground/20 rounded-lg transition-all focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:border-primary/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Dynamic Filter segmented controls */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
            <div className="flex items-center gap-1 bg-background/60 p-1 border border-border/60 rounded-lg w-full md:w-auto">
              {["ALL", "LOST", "FOUND"].map((t) => {
                const isActive = typeFilter === t;
                return (
                  <Button
                    key={t}
                    variant="ghost"
                    size="sm"
                    className={`h-9 px-4 rounded-md text-xs font-semibold tracking-wider transition-all duration-200 flex-1 md:flex-none ${
                      isActive
                        ? "bg-background text-foreground shadow-sm border border-border/60 font-bold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                    onClick={() => setTypeFilter(t)}
                  >
                    {t}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Listings / Content Grid area */}
        {loading ? (
          /* High-fidelity Skeleton Loaders */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="h-72 rounded-2xl bg-gradient-to-br from-muted/60 to-muted/30 border border-border/30 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-foreground/[0.03] before:to-transparent" 
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          /* Clean Empty State Illustration Context */
          <div className="flex flex-col items-center justify-center text-center py-24 px-4 border border-dashed border-border/60 rounded-2xl bg-card/10 backdrop-blur-[1px] animate-in fade-in zoom-in-95 duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground mb-4 border border-border/40">
              <PackageX className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-foreground tracking-tight">No matching entries found</h3>
            <p className="text-sm text-muted-foreground max-w-xs mt-1.5 leading-relaxed">
              We couldn't find anything matching "{search}". Double-check your keywords or explore a different category filter.
            </p>
            {(search || typeFilter !== "ALL") && (
              <Button 
                variant="link" 
                size="sm" 
                className="mt-4 text-primary font-semibold underline-offset-4"
                onClick={() => { setSearch(""); setTypeFilter("ALL"); }}
              >
                Clear all filters
              </Button>
            )}
          </div>
        ) : (
          /* Valid Item Results View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-400">
            {filtered.map((item) => (
              <div key={item._id} className="transition-all duration-200 hover:translate-y-[-2px]">
                <ItemCard item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}