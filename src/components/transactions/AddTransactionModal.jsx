import { useState } from "react";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";

const typeOptions = [
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" }
];

const initialForm = {
  date: "",
  description: "",
  category: "",
  type: "expense",
  amount: ""
};

export function AddTransactionModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const amount = Number(form.amount);
    const cleanDescription = form.description.trim();
    const cleanCategory = form.category.trim();

    if (!form.date || !cleanDescription || !cleanCategory || !form.amount) {
      setError("Please complete all fields before saving.");
      return;
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      setError("Amount must be a valid number greater than 0.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    onSubmit({
      ...form,
      description: cleanDescription,
      category: cleanCategory,
      amount
    });
    window.setTimeout(() => {
      setIsSubmitting(false);
      setForm(initialForm);
      onClose();
    }, 300);
  };

  return (
    <Modal isOpen={isOpen} title="Add Transaction" onClose={onClose}>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <Input label="Date" type="date" value={form.date} onChange={(e) => updateField("date", e.target.value)} />
        <Input
          label="Description"
          placeholder="e.g., Grocery Store"
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
        />
        <Input
          label="Category"
          placeholder="e.g., Food"
          value={form.category}
          onChange={(e) => updateField("category", e.target.value)}
        />
        <Select label="Type" options={typeOptions} value={form.type} onChange={(e) => updateField("type", e.target.value)} />
        <Input
          label="Amount"
          type="number"
          min="1"
          value={form.amount}
          onChange={(e) => updateField("amount", e.target.value)}
        />
        {error ? <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-expense dark:bg-red-950/40">{error}</p> : null}
        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
