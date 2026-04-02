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

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.date || !form.description || !form.category || !form.amount) return;

    onSubmit({
      ...form,
      amount: Number(form.amount)
    });
    setForm(initialForm);
    onClose();
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
        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Modal>
  );
}
