import { useEffect, useState } from "react";
import { useItemStore } from "../store/useItemStore";
import { useResponseStore } from "../store/useResponseStore";
import ItemBadge from "../components/items/ItemBadge";
import ResponseCard from "../components/responses/ResponseCard";
import { Button } from "../components/ui/button";
import { ChevronDown, ChevronUp, MapPin, MessageSquare, Inbox } from "lucide-react";

function MyItemRow({ item }) {
  const [expanded, setExpanded] = useState(false);
  const { receivedResponses, fetchReceivedResponses } = useResponseStore();

  const handleExpand = () => {
    if (!expanded) fetchReceivedResponses();
    setExpanded((e) => !e);
  };

  const itemResponses = receivedResponses.filter(
    (r) => r.itemId?._id === item._id || r.itemId === item._id
  );

  return (
    <div className="bg-card/40 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden transition-all duration-300 hover:border-border shadow-sm shadow-foreground/[0.01]">
      <div className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Item Meta Columns */}
          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <ItemBadge type={item.type} status={item.status} />
              
              {/* Micro badge indicator for count */}
              {itemResponses.length > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-primary/10 text-primary border border-primary/10">
                  <MessageSquare className="w-3 h-3" /> {itemResponses.length}
                </span>
              )}
            </div>
            
            <h3 className="font-semibold text-base tracking-tight text-foreground truncate">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground/90 flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" /> {item.location}
            </p>
          </div>

          {/* Expand Trigger Button */}
          <div className="flex sm:block border-t border-border/40 sm:border-0 pt-3 sm:pt-0">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExpand}
              className={`h-9 w-full sm:w-auto px-4 gap-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                expanded 
                  ? "bg-muted text-foreground border-border/80" 
                  : "bg-background/50 hover:bg-muted/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="mr-auto sm:mr-0">View Responses</span>
              {expanded ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
            </Button>
          </div>
        </div>

        {/* Nested Content Drawer Expansion */}
        {expanded && (
          <div className="mt-4 space-y-3 border-t border-border/50 pt-4 animate-in fade-in slide-in-from-top-2 duration-200">
            {itemResponses.length === 0 ? (
              <div className="text-center py-6 px-4 rounded-lg bg-muted/20 border border-dashed border-border/50">
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                  No claims or verification replies received yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 pl-1 sm:pl-3 border-l-2 border-primary/20">
                {itemResponses.map((r) => (
                  <ResponseCard key={r._id} response={r} isOwner={true} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MyItemsPage() {
  const { myItems, fetchMyItems, loading } = useItemStore();

  useEffect(() => {
    fetchMyItems();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground px-4 sm:px-8 py-10 sm:py-16 antialiased selection:bg-primary/10">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Dashboard Title Header */}
        <div className="border-b border-border/60 pb-6 space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">My Posted Items</h1>
          <p className="text-sm text-muted-foreground">
            Monitor verification responses and settle matched item listings.
          </p>
        </div>

        {/* List Canvas Areas */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i} 
                className="h-24 sm:h-28 rounded-xl bg-gradient-to-r from-muted/60 to-muted/30 border border-border/30 animate-pulse" 
              />
            ))}
          </div>
        ) : myItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 px-4 border border-dashed border-border/60 rounded-2xl bg-card/10 backdrop-blur-[1px] animate-in fade-in zoom-in-95 duration-300">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-muted-foreground mb-4 border border-border/40">
              <Inbox className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-foreground tracking-tight">No items reported</h3>
            <p className="text-xs text-muted-foreground max-w-xs mt-1 leading-relaxed">
              You haven't listed any lost or found belongings on this account yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-300">
            {myItems.map((item) => (
              <MyItemRow key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}