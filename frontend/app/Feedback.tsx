import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { BACKEND_URL } from "../src/config";

export default function FeedbackScreen() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const submitFeedback = async () => {
    setStatus("Submitting...");

    try {
      const res = await fetch(`${BACKEND_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("Submitted!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("Error submitting");
      }
    } catch (error) {
      setStatus("Error submitting");
      console.error("Feedback submission error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Feedback</Text>

      <TextInput
        placeholder="Name"
        value={form.name}
        onChangeText={(t) => setForm({ ...form, name: t })}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={form.email}
        onChangeText={(t) => setForm({ ...form, email: t })}
        style={styles.input}
      />

      <TextInput
        placeholder="Message"
        value={form.message}
        onChangeText={(t) => setForm({ ...form, message: t })}
        multiline
        style={styles.textArea}
      />

      <TouchableOpacity
        onPress={submitFeedback}
        style={styles.submitBtn}
      >
        <Text style={styles.submitBtnText}>Submit</Text>
      </TouchableOpacity>

      {status !== "" && (
        <Text style={styles.status}>{status}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 20,
    flex: 1,
    backgroundColor: "white"
  },
  header: { 
    fontSize: 26, 
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "#f8f8f8",
  },
  textArea: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    height: 120,
    marginTop: 10,
    textAlignVertical: 'top',
    backgroundColor: "#f8f8f8",
  },
  submitBtn: {
    backgroundColor: "#009179",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  submitBtnText: {
    color: "white",
    fontWeight: "bold",
  },
  status: {
    marginTop: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});