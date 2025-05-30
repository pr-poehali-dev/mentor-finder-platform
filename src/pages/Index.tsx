import { useState } from "react";
import MentorCard from "@/components/MentorCard";
import MentorForm from "@/components/MentorForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockMentors = [
  {
    id: 1,
    name: "Елена Васильевна Петрова",
    subject: "Математика",
    experience: 15,
    specializations: ["Алгебра", "Геометрия", "ЕГЭ"],
    description:
      "Опытный преподаватель математики с большим стажем работы в школе. Помогу освоить сложные темы и подготовиться к экзаменам.",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108755-2616b612b913?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Михаил Александрович Сидоров",
    subject: "Физика",
    experience: 12,
    specializations: ["Механика", "Электричество", "Олимпиады"],
    description:
      "Преподаю физику уже 12 лет. Специализируюсь на подготовке к олимпиадам и углубленном изучении предмета.",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Анна Сергеевна Козлова",
    subject: "Русский язык и литература",
    experience: 8,
    specializations: ["Сочинения", "ОГЭ", "Грамматика"],
    description:
      "Молодой, но опытный педагог. Использую современные методики преподавания для эффективного обучения.",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
];

const Index = () => {
  const [mentors, setMentors] = useState(mockMentors);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [showForm, setShowForm] = useState(false);

  const subjects = [...new Set(mentors.map((m) => m.subject))];

  const filteredMentors = mentors
    .filter(
      (mentor) =>
        mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.specializations.some((spec) =>
          spec.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
    )
    .filter(
      (mentor) => selectedSubject === "" || mentor.subject === selectedSubject,
    );

  const addMentor = (newMentor: any) => {
    setMentors((prev) => [...prev, newMentor]);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-montserrat text-3xl font-bold text-gray-900 mb-2">
                Педагоги<span className="text-purple-600">Ментор</span>
              </h1>
              <p className="text-gray-600">
                Платформа для поиска наставников в образовании
              </p>
            </div>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="mt-4 md:mt-0 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
            >
              {showForm ? "Скрыть форму" : "Стать ментором"}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Form Section */}
        {showForm && (
          <div className="mb-8 animate-fade-in">
            <MentorForm onSubmit={addMentor} />
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-8 bg-white rounded-lg shadow-sm border border-purple-100 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Поиск по имени, предмету или специализации..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-gray-200 focus:border-purple-400"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedSubject === "" ? "default" : "outline"}
                className={`cursor-pointer ${selectedSubject === "" ? "bg-purple-600" : "hover:bg-purple-50"}`}
                onClick={() => setSelectedSubject("")}
              >
                Все предметы
              </Badge>
              {subjects.map((subject) => (
                <Badge
                  key={subject}
                  variant={selectedSubject === subject ? "default" : "outline"}
                  className={`cursor-pointer ${selectedSubject === subject ? "bg-purple-600" : "hover:bg-purple-50"}`}
                  onClick={() => setSelectedSubject(subject)}
                >
                  {subject}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-purple-100">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {mentors.length}
            </div>
            <div className="text-gray-600">Активных менторов</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-purple-100">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {subjects.length}
            </div>
            <div className="text-gray-600">Предметов</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-purple-100">
            <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-gray-600">Проверенные педагоги</div>
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <MentorCard key={mentor.id} {...mentor} />
          ))}
        </div>

        {filteredMentors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">🔍</div>
            <p className="text-gray-500">
              Не найдено менторов по вашему запросу
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
