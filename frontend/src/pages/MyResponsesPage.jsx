import { useEffect } from "react";
import { useResponseStore } from "../store/useResponseStore";
import ResponseCard from "../components/responses/ResponseCard";
import { History, Loader2 } from "lucide-react";

export default function MyResponsesPage() {
  const { myResponses, fetchMyResponses, loading } = useResponseStore();

  useEffect(() => {
    fetchMyResponses();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground px-4 sm:px-8 py-10 sm:py-16 antialiased selection:bg-primary/10">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Dashboard Title Header */}
        <div className="border-b border-border/60 pb-6 space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">My Responses</h1>
          <p className="text-sm text-muted-foreground">
            Track ownership verification claims you have submitted for lost or found items.
          </p>
        </div>

        {/* List Canvas Areas */}
        {loading ? (
          /* High-Fidelity Shimmer Loaders */
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i} 
                className="h-28 sm:h-32 rounded-xl bg-gradient-to-r from-muted/60 to-muted/30 border border-border/30 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-foreground/[0.02] before:to-transparent" 
              />
            ))}
          </div>
        ) : myResponses.length === 0 ? (
          /* Clean Empty State Illustration Context */
          <div className="flex flex-col items-center justify-center text-center py-20 px-4 border border-dashed border-border/60 rounded-2xl bg-card/10 backdrop-blur-[1px] animate-in fade-in zoom-in-95 duration-300">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-muted-foreground mb-4 border border-border/40">
              <History className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-foreground tracking-tight">No claims found</h3>
            <p className="text-xs text-muted-foreground max-w-xs mt-1 leading-relaxed">
              You haven't submitted any verification answers or claims for reported objects yet.
            </p>
          </div>
        ) : (
          /* Valid Response Cards Grid/List */
          <div className="space-y-4 animate-in fade-in duration-300">
            {myResponses.map((r) => (
              <div key={r._id} className="transition-all duration-200 hover:translate-x-[2px]">
                <ResponseCard response={r} isOwner={false} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}