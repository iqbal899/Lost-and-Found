import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useItemStore } from "../store/useItemStore";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { UploadCloud, FileCode2, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function PostItemPage() {
  const { createItem } = useItemStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", type: "LOST", location: "", question: "",
  });
  const [files, setFiles] = useState([]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      files.forEach((f) => fd.append("itemPictures", f));
      await createItem(fd);
      toast.success("Item posted successfully!");
      navigate("/my-items");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-4 sm:px-8 py-10 sm:py-16 antialiased selection:bg-primary/10">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">Post an Item</h1>
            <p className="text-sm text-muted-foreground">
              Fill out the details below to report a lost or found item.
            </p>
          </div>
          {/* Contextual Status Badge */}
          <div className="self-start sm:self-center">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide border transition-colors duration-300 ${
              form.type === "LOST" 
                ? "bg-destructive/10 text-destructive border-destructive/20" 
                : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
            }`}>
              {form.type} REPORT
            </span>
          </div>
        </div>

        {/* Clean, Spaced Main Form Panel */}
        <form onSubmit={handleSubmit} className="space-y-6 sm:bg-card/30 sm:backdrop-blur-sm sm:border sm:border-border/60 sm:rounded-2xl sm:p-8 sm:shadow-sm">
          
          {/* Row 1: Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="item-type" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/90">
              Listing Type
            </Label>
            <Select
              value={form.type}
              onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}
            >
              <SelectTrigger id="item-type" className="bg-background/50 h-11 border-muted-foreground/20 rounded-lg transition-all focus:ring-1 focus:ring-primary/40">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border/80">
                <SelectItem value="LOST" className="focus:bg-destructive/10 focus:text-destructive font-medium">LOST</SelectItem>
                <SelectItem value="FOUND" className="focus:bg-emerald-500/10 focus:text-emerald-500 font-medium">FOUND</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Row 2: Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/90">
              Item Title
            </Label>
            <Input 
              id="title"
              placeholder="e.g., Matte black leather wallet" 
              required 
              value={form.title} 
              onChange={set("title")} 
              className="bg-background/50 h-11 px-3.5 border-muted-foreground/20 rounded-lg transition-all focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:border-primary/50"
            />
          </div>

          {/* Row 3: Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/90">
              Detailed Description
            </Label>
            <Textarea 
              id="description"
              placeholder="Provide distinctive marks, brand names, unique keychains, color patterns, etc." 
              required 
              value={form.description} 
              onChange={set("description")} 
              className="bg-background/50 min-h-[110px] p-3.5 border-muted-foreground/20 rounded-lg resize-y transition-all focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:border-primary/50 placeholder:text-muted-foreground/60"
            />
          </div>

          {/* Row 4: Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/90">
              Location
            </Label>
            <div className="relative">
              <Input 
                id="location"
                placeholder={form.type === "LOST" ? "Where was it last seen?" : "Where did you find it?"} 
                required 
                value={form.location} 
                onChange={set("location")} 
                className="bg-background/50 h-11 pl-10 pr-3.5 border-muted-foreground/20 rounded-lg transition-all focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:border-primary/50"
              />
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
            </div>
          </div>

          {/* Row 5: Ownership Verification */}
          <div className="space-y-2">
            <Label htmlFor="question" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/90">
              Ownership Verification Question
            </Label>
            <Input
              id="question"
              placeholder="e.g., What stickers are pasted on the laptop back lid?"
              required
              value={form.question}
              onChange={set("question")}
              className="bg-background/50 h-11 px-3.5 border-muted-foreground/20 rounded-lg transition-all focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:border-primary/50"
            />
            <p className="text-[11px] text-muted-foreground/70 leading-relaxed mt-1 pl-0.5">
              Security step: Claims require an answer to this question to verify true ownership.
            </p>
          </div>

          {/* Row 6: Dropzone/File Input Styling */}
          <div className="space-y-2">
            <Label htmlFor="photos" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/90">
              Photos <span className="text-muted-foreground/50 lowercase font-normal">(optional)</span>
            </Label>
            <div className="relative group flex flex-col items-center justify-center border border-dashed border-muted-foreground/20 rounded-xl bg-background/30 hover:bg-background/60 hover:border-primary/40 transition-all duration-200 p-5 cursor-pointer">
              <input
                id="photos"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setFiles([...e.target.files])}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
              />
              <div className="flex flex-col items-center gap-1.5 text-center pointer-events-none">
                <UploadCloud className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <p className="text-xs font-medium text-foreground/90">
                  {files.length > 0 ? `${files.length} image(s) selected` : "Click to upload matching photos"}
                </p>
                <p className="text-[11px] text-muted-foreground/60">
                  Supports JPEG, PNG up to multiple pictures
                </p>
              </div>
            </div>
            
            {/* Minimal Image Queue Pill List */}
            {files.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1.5">
                {files.map((file, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-muted text-muted-foreground border border-border">
                    <FileCode2 className="w-3 h-3" /> {file.name.length > 18 ? `${file.name.slice(0, 15)}...` : file.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submit Action */}
          <Button 
            type="submit" 
            className="w-full h-11 rounded-lg font-medium tracking-wide shadow-sm active:scale-[0.985] transition-all duration-150 mt-4" 
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2 justify-center">
                <Loader2 className="w-4 h-4 animate-spin" />
                Publishing listing...
              </span>
            ) : (
              "Post Item"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}