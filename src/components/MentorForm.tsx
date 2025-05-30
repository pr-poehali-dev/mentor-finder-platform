import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MentorForm = ({ onSubmit }: { onSubmit: (mentor: any) => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    experience: "",
    description: "",
    specializations: [] as string[],
  });

  const [newSpec, setNewSpec] = useState("");

  const addSpecialization = () => {
    if (newSpec.trim() && !formData.specializations.includes(newSpec.trim())) {
      setFormData((prev) => ({
        ...prev,
        specializations: [...prev.specializations, newSpec.trim()],
      }));
      setNewSpec("");
    }
  };

  const removeSpecialization = (spec: string) => {
    setFormData((prev) => ({
      ...prev,
      specializations: prev.specializations.filter((s) => s !== spec),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.subject && formData.experience) {
      onSubmit({
        ...formData,
        experience: parseInt(formData.experience),
        id: Date.now(),
      });
      setFormData({
        name: "",
        subject: "",
        experience: "",
        description: "",
        specializations: [],
      });
    }
  };

  return (
    <Card className="border-purple-100 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-t-lg">
        <CardTitle className="font-montserrat text-purple-800">
          Стать ментором
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Ваше имя"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="border-gray-200 focus:border-purple-400"
            />
            <Input
              placeholder="Предмет"
              value={formData.subject}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, subject: e.target.value }))
              }
              className="border-gray-200 focus:border-purple-400"
            />
          </div>

          <Input
            type="number"
            placeholder="Опыт работы (лет)"
            value={formData.experience}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, experience: e.target.value }))
            }
            className="border-gray-200 focus:border-purple-400"
          />

          <div>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Добавить специализацию"
                value={newSpec}
                onChange={(e) => setNewSpec(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addSpecialization())
                }
                className="border-gray-200 focus:border-purple-400"
              />
              <Button
                type="button"
                onClick={addSpecialization}
                variant="outline"
                className="border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                +
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.specializations.map((spec, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-purple-100 text-purple-700 cursor-pointer hover:bg-red-100 hover:text-red-700"
                  onClick={() => removeSpecialization(spec)}
                >
                  {spec} ×
                </Badge>
              ))}
            </div>
          </div>

          <textarea
            placeholder="Расскажите о себе и своем опыте..."
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full p-3 border border-gray-200 rounded-md focus:border-purple-400 focus:outline-none resize-none h-24"
          />

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium"
          >
            Разместить анкету
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MentorForm;
