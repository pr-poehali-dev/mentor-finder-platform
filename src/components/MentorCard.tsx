import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MentorCardProps {
  name: string;
  supportArea: string;
  experience: number;
  specializations: string[];
  description: string;
  imageUrl?: string;
}

const MentorCard = ({
  name,
  supportArea,
  experience,
  specializations,
  description,
  imageUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
}: MentorCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-gray-100">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <img
            src={imageUrl}
            alt={name}
            className="w-16 h-16 rounded-full object-cover border-2 border-purple-100"
          />
          <div className="flex-1">
            <h3 className="font-montserrat font-bold text-lg text-gray-900 mb-1">
              {name}
            </h3>
            <p className="text-purple-600 font-medium">{supportArea}</p>
            <p className="text-sm text-gray-500">
              {experience} лет поддержки коллег
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {specializations.map((spec, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-purple-50 text-purple-700 hover:bg-purple-100"
              >
                {spec}
              </Badge>
            ))}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <Button className="flex-1 mr-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium">
            💚 Получить поддержку
          </Button>
          <Button
            variant="outline"
            className="px-3 border-emerald-200 text-emerald-600 hover:bg-emerald-50"
          >
            🤗
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MentorCard;
