import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../ui/card";
import ItemBadge from "./ItemBadge";
import { MapPin, Eye, User } from "lucide-react";

export default function ItemCard({ item }) {
  const baseApiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const ASSET_ROOT = baseApiUrl.replace(/\/api$/, "");

  // Safe fallback resolver for the thumbnail image source path
  let imageFile = null;
  const firstPic = item.itemPictures?.[0];

  if (firstPic) {
    if (typeof firstPic === "string") {
      imageFile = firstPic;
    } else if (firstPic.img) {
      imageFile = firstPic.img;
    } else if (firstPic.url) {
      imageFile = firstPic.url;
    }
  }

  const imgSrc = imageFile ? `${ASSET_ROOT}/uploads/${imageFile}` : null;

  return (
    <Link to={`/items/${item._id}`}>
      <Card className="hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group cursor-pointer">
        <div className="h-44 bg-muted overflow-hidden">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                console.log("Image source fell back:", imgSrc);
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
              No image
            </div>
          )}
        </div>

        <CardContent className="p-4 pb-2">
          <div className="mb-2">
            <ItemBadge type={item.type} status={item.status} />
          </div>

          <h3 className="font-semibold text-base truncate">
            {item.title}
          </h3>

          <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
            {item.description}
          </p>
        </CardContent>

        <CardFooter className="px-4 pb-4 pt-0 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {item.location}
          </span>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {item.views || 0}
            </span>

            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {item.createdBy?.firstname} {item.createdBy?.lastname}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}