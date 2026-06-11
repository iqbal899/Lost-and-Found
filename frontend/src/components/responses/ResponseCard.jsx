import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { useState } from "react";
import { useResponseStore } from "../../store/useResponseStore";
import { toast } from "sonner";

export default function ResponseCard({ response, isOwner = false }) {
  const { acceptResponse, fetchContactDetails } = useResponseStore();
  const [contact, setContact] = useState(null);
  const [loadingContact, setLoadingContact] = useState(false);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
    accepted: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  };

  const handleAccept = async () => {
    try {
      await acceptResponse(response._id);
      toast({ title: "Response accepted!" });
    } catch (e) {
      toast({ title: "Error", description: e.response?.data?.message, variant: "destructive" });
    }
  };

  const handleGetContact = async () => {
    setLoadingContact(true);
    try {
      const data = await fetchContactDetails(response._id);
      setContact(data);
    } catch (e) {
      toast({ title: "Access denied", variant: "destructive" });
    } finally {
      setLoadingContact(false);
    }
  };

  return (
    <Card className="border border-border">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-medium text-sm">
              {isOwner
                ? `${response.responder?.firstname} ${response.responder?.lastname}`
                : `Re: ${response.itemId?.title}`}
            </p>
            <p className="text-muted-foreground text-sm mt-1">{response.answer}</p>
          </div>
          <Badge className={cn("shrink-0", statusColors[response.status])}>
            {response.status}
          </Badge>
        </div>

        {isOwner && response.status === "pending" && (
          <Button size="sm" onClick={handleAccept} className="w-full">
            Accept this response
          </Button>
        )}

        {response.status === "accepted" && (
          contact ? (
            <div className="rounded-lg bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 p-3 text-sm space-y-1">
              <p className="font-medium text-sky-700 dark:text-sky-300">Contact Details</p>
              <p>{contact.firstname} {contact.lastname}</p>
              <p>{contact.email}</p>
              <p>{contact.number}</p>
            </div>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={handleGetContact}
              disabled={loadingContact}
            >
              {loadingContact ? "Loading..." : "View Contact Details"}
            </Button>
          )
        )}
      </CardContent>
    </Card>
  );
}