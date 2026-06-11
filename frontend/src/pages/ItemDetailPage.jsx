import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useItemStore } from "../store/useItemStore";
import { useAuthStore } from "../store/useAuthStore";
import { useResponseStore } from "../store/useResponseStore";
import ItemBadge from "../components/items/ItemBadge";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { MapPin, Eye, ShieldCheck, CornerDownRight, Loader2, LogIn } from "lucide-react";
import { toast } from "sonner";

export default function ItemDetailPage() {
  const { id } = useParams();
  const { currentItem, fetchSingleItem, loading } = useItemStore();
  const { user } = useAuthStore();
  const { submitResponse } = useResponseStore();
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchSingleItem(id);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitResponse({ itemId: id, answer });
      setSubmitted(true);
      toast.success("Response submitted successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit verification");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground px-4 sm:px-8 py-10 sm:py-16 antialiased">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="h-6 w-24 bg-muted rounded-full animate-pulse" />
          <div className="space-y-2">
            <div className="h-9 w-3/4 bg-muted rounded-lg animate-pulse" />
            <div className="h-5 w-1/3 bg-muted rounded animate-pulse" />
          </div>
          <div className="h-56 sm:h-72 w-full bg-gradient-to-br from-muted/60 to-muted/30 border border-border/30 rounded-2xl animate-pulse" />
          <div className="h-32 w-full bg-muted/40 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (!currentItem) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <p className="text-muted-foreground text-sm">Item listing could not be found.</p>
        <Link to="/browse" className="text-primary font-medium text-sm hover:underline mt-2">
          Back to browsing
        </Link>
      </div>
    );
  }

  const isOwner = user?.id === currentItem.createdBy?._id;

  return (
    <div className="min-h-screen bg-background text-foreground px-4 sm:px-8 py-10 sm:py-16 antialiased selection:bg-primary/10">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Detail Meta & Header */}
        <div className="space-y-4">
          <div>
            <ItemBadge type={currentItem.type} status={currentItem.status} />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {currentItem.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-muted-foreground/90">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-4 h-4 text-muted-foreground/60" /> {currentItem.location}
              </span>
              <span className="hidden sm:inline text-muted-foreground/30">•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <Eye className="w-4 h-4 text-muted-foreground/60" /> {currentItem.views || 0} views
              </span>
            </div>
          </div>
        </div>

        {/* Multi-Image Gallery Layout */}
        {currentItem.itemPictures?.length > 0 && (
          <div className="relative group">
            <div className="flex gap-4 overflow-x-auto pb-3 pt-1 px-1 snap-x scroll-smooth no-scrollbar mask-image-edge">
              {currentItem.itemPictures.map((pic, i) => (
                <div 
                  key={i} 
                  className="relative shrink-0 snap-start h-56 sm:h-72 w-[85%] sm:w-[480px] rounded-2xl border border-border/50 bg-muted overflow-hidden shadow-sm hover:shadow transition-shadow duration-300"
                >
                  <img
                    src={`http://localhost:5000/uploads/${pic.img}`}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.01]"
                    alt={`${currentItem.title} thumbnail ${i + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Section: Description */}
        <div className="space-y-2.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 pl-0.5">
            Detailed Description
          </h2>
          <div className="bg-card/40 backdrop-blur-sm border border-border/60 rounded-2xl p-5 sm:p-6 shadow-sm shadow-foreground/[0.01]">
            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed whitespace-pre-line">
              {currentItem.description}
            </p>
          </div>
        </div>

        {/* Interactive Action Canvas Section */}
        {!isOwner && user && currentItem.status === "open" && (
          <div className="space-y-3 pt-2">
            <div className="bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-md border border-border/70 rounded-2xl p-5 sm:p-6 shadow-md shadow-foreground/[0.01]">
              <div className="flex flex-col gap-4">
                
                {/* Header question context */}
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/10">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold tracking-tight text-foreground">
                      Ownership Verification Challenge
                    </h3>
                    <p className="text-xs text-muted-foreground leading-normal">
                      The owner requires a precise answer to the safety question before sharing absolute contact channels.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 bg-background/50 border border-border/40 p-3.5 rounded-xl mt-1">
                  <CornerDownRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-foreground/90 leading-relaxed italic">
                    "{currentItem.question}"
                  </p>
                </div>

                {/* Submitting Flow Toggle Blocks */}
                {submitted ? (
                  <div className="rounded-xl bg-emerald-500/10 p-4 text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/15 animate-in fade-in zoom-in-95 duration-200 mt-2">
                    ✓ Your verification reply was logged successfully. The item owner has been notified to check your match data.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                    <Textarea
                      placeholder="Type structural descriptions, color labels, serial codes or key clues..."
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="bg-background/60 min-h-[100px] p-3.5 border-muted-foreground/20 rounded-xl resize-y transition-all focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:border-primary/50 placeholder:text-muted-foreground/60 text-sm"
                      required
                    />
                    <Button 
                      type="submit" 
                      disabled={submitting} 
                      className="w-full sm:w-auto h-10 px-6 font-medium rounded-lg shadow-sm active:scale-[0.985] transition-all duration-150"
                    >
                      {submitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting Claim...
                        </span>
                      ) : (
                        "Submit Response"
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Logged Out Safety Warning */}
        {!user && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border border-dashed border-border p-5 rounded-2xl bg-card/20 backdrop-blur-[1px] text-center sm:text-left mt-6">
            <div className="space-y-0.5">
              <h4 className="text-sm font-semibold text-foreground">Want to claim or match this item?</h4>
              <p className="text-xs text-muted-foreground">Authentication credentials are required to interact with verification portals.</p>
            </div>
            <Button asChild size="sm" variant="outline" className="h-9 gap-2 rounded-lg font-medium shadow-sm w-full sm:w-auto">
              <Link to="/login">
                <LogIn className="w-3.5 h-3.5" /> Sign in to respond
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}