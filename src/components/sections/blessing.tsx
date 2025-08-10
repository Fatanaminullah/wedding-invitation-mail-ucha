"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Heart,
  Send,
  User,
  Clock,
  CheckCircle,
  X,
  Check,
  AlertCircle,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import Anim from "@/components/global/anim";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase, type Blessing as BlessingType } from "@/lib/supabase";

interface Translations {
  blessing: {
    title: string;
    description: string;
    nameLabel: string;
    namePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    successMessage: string;
    showMore: string;
    allBlessings: string;
    close: string;
  };
  common: {
    loading: string;
    error: string;
    tryAgain: string;
  };
}

interface Blessing {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

interface BlessingForm {
  name: string;
  message: string;
}

export default function Blessing() {
  const [translations, setTranslations] = useState<Translations | null>(null);
  const searchParams = useSearchParams();
  const [blessings, setBlessings] = useState<BlessingType[]>([]);
  const [formData, setFormData] = useState<BlessingForm>({
    name: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Extract guest name from URL params and set as default
  useEffect(() => {
    const guest = searchParams.get("guest");
    if (guest) {
      setFormData((prev) => ({
        ...prev,
        name: decodeURIComponent(guest),
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    const loadTranslations = async () => {
      const locale = localStorage.getItem("locale") || "id";
      try {
        const translationModule = await import(
          `../../../messages/${locale}.json`
        );
        setTranslations(translationModule.default);
      } catch (error) {
        console.error("Failed to load translations:", error);
        // Fallback to Indonesian
        const fallbackModule = await import("../../../messages/id.json");
        setTranslations(fallbackModule.default);
      }
    };

    loadTranslations();

    // Listen for language changes
    const handleStorageChange = () => {
      loadTranslations();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Load blessings and set up real-time subscription
  useEffect(() => {
    loadBlessings();

    // Set up real-time subscription
    const channel = supabase
      .channel("blessings")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "blessings" },
        (payload) => {
          const newBlessing = payload.new as BlessingType;
          setBlessings((current) => [newBlessing, ...current]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadBlessings = async () => {
    try {
      const { data, error } = await supabase
        .from("blessings")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setBlessings(data || []);
    } catch (error) {
      console.error("Error loading blessings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.message.trim()) {
      setErrorMessage("Please fill in all fields");
      setSubmitStatus("error");
      return;
    }

    if (formData.message.trim().length > 500) {
      setErrorMessage("Message is too long (max 500 characters)");
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/blessings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          message: formData.message.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit blessing");
      }

      setSubmitStatus("success");
      // Reset form after successful submission
      setFormData({
        name: "",
        message: "",
      });

      // Auto-refresh the blessings list
      await loadBlessings();

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Error submitting blessing:", error);
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to submit blessing. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!translations) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-stone-50 to-gray-50 py-20 px-6">
      <div className="max-w-md mx-auto">
        <Anim className="block">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">
              {translations.blessing.title}
            </h2>
            <div className="w-20 h-0.5 bg-stone-400 mx-auto mb-6"></div>
            <p className="text-gray-600 leading-relaxed text-sm">
              {translations.blessing.description}
            </p>
          </div>
        </Anim>

        {/* Blessing Form */}
        <Anim delay={200} className="block">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-8">
            {/* Success Message */}
            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <Check className="text-green-600 flex-shrink-0" size={20} />
                  <p className="text-green-800 text-sm">
                    {translations.blessing.successMessage}
                  </p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <AlertCircle
                    className="text-red-600 flex-shrink-0"
                    size={20}
                  />
                  <p className="text-red-800 text-sm">
                    {errorMessage || translations.common.error}
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {translations.blessing.nameLabel}
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder={translations.blessing.namePlaceholder}
                  required
                  className="w-full"
                  disabled={isSubmitting}
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {translations.blessing.messageLabel}
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder={translations.blessing.messagePlaceholder}
                  required
                  className="w-full min-h-[120px] resize-none"
                  disabled={isSubmitting}
                />
                <div className="flex justify-end mt-1">
                  <span
                    className={`text-xs ${
                      formData.message.length > 500
                        ? "text-red-500"
                        : formData.message.length > 400
                        ? "text-orange-500"
                        : "text-gray-400"
                    }`}
                  >
                    {formData.message.length}/500
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={
                  isSubmitting ||
                  !formData.name.trim() ||
                  !formData.message.trim()
                }
                className="w-full bg-stone-600 hover:bg-stone-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {translations.common.loading}
                  </>
                ) : (
                  <>
                    <Send size={16} className="mr-2" />
                    {translations.blessing.submitButton}
                  </>
                )}
              </Button>
            </form>
          </div>
        </Anim>

        {/* Blessings List */}
        <Anim delay={400} className="block">
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex items-center gap-3 justify-center mb-4">
                <h3 className="text-xl font-serif font-semibold text-gray-800">
                  Blessings from Loved Ones
                </h3>
              </div>
              <div className="w-16 h-0.5 bg-stone-400 mx-auto"></div>
            </div>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto mb-4"></div>
                <p className="text-gray-500">{translations.common.loading}</p>
              </div>
            ) : blessings.length === 0 ? (
              <div className="text-center py-8">
                <Heart className="h-8 w-8 text-stone-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Be the first to leave a blessing!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {blessings.slice(0, 3).map((blessing, index) => (
                  <div key={blessing.id} className="">
                    <Anim delay={100 * index} className="block">
                      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-stone-400 to-stone-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <Heart className="text-white" size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-gray-800 truncate">
                                {blessing.name}
                              </h4>
                              <span className="text-xs text-gray-500">
                                {formatDate(blessing.created_at)}
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {blessing.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Anim>
                  </div>
                ))}

                {/* Show More Button */}
                {blessings.length > 3 && (
                  <div className="text-center mt-6">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full border-stone-200 text-stone-600 hover:bg-stone-50"
                        >
                          {translations.blessing.showMore} (
                          {blessings.length - 3} more)
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="h-screen">
                        <DialogHeader className="">
                          <div className="flex items-center justify-between">
                            <DialogTitle className="flex items-center gap-2 text-left">
                              {translations.blessing.allBlessings}
                            </DialogTitle>
                          </div>
                        </DialogHeader>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto h-[calc(100vh-120px)]">
                          <div className="space-y-4 max-w-2xl mx-auto">
                            {blessings.map((blessing, index) => (
                              <div
                                key={blessing.id}
                                className="bg-gray-50 rounded-xl p-4"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="w-8 h-8 bg-gradient-to-br from-stone-400 to-stone-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Heart className="text-white" size={16} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="font-semibold text-gray-800 text-sm truncate">
                                        {blessing.name}
                                      </h4>
                                      <span className="text-xs text-gray-500">
                                        {formatDate(blessing.created_at)}
                                      </span>
                                    </div>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                      {blessing.message}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}

                            {blessings.length === 0 && (
                              <div className="text-center py-8">
                                <Heart className="h-8 w-8 text-stone-400 mx-auto mb-4" />
                                <p className="text-gray-500">
                                  No blessings yet. Be the first to leave one!
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>
            )}
          </div>
        </Anim>
      </div>
    </section>
  );
}
