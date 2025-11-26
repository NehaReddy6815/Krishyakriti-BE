import { ScrollView, Text, View, StyleSheet } from "react-native";

export default function MultiCropping() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🌱 Multicropping</Text>

      <Text style={styles.title}>What is Multicropping?</Text>
      <Text style={styles.text}>
        Multicropping means growing two or more crops on the same land during a
        single season. This increases income, improves soil health and reduces
        risk for farmers.
      </Text>

      <Text style={styles.title}>Benefits</Text>
      <Text style={styles.point}>• Better use of land and water</Text>
      <Text style={styles.point}>• Higher total yield from the same field</Text>
      <Text style={styles.point}>• Less pest/disease attack</Text>
      <Text style={styles.point}>• Extra income even if one crop fails</Text>
      <Text style={styles.point}>• Improves soil fertility naturally</Text>

      <Text style={styles.title}>Good Crop Combinations</Text>
      <Text style={styles.point}>• Maize + Beans</Text>
      <Text style={styles.point}>• Ragi + Red Gram</Text>
      <Text style={styles.point}>• Groundnut + Red Gram</Text>
      <Text style={styles.point}>• Sugarcane + Vegetables</Text>
      <Text style={styles.point}>• Coconut + Banana + Pepper</Text>

      <Text style={styles.title}>Best Practices</Text>
      <Text style={styles.point}>• Choose crops that don’t compete much</Text>
      <Text style={styles.point}>• Maintain proper row spacing</Text>
      <Text style={styles.point}>• Use organic manure to improve soil</Text>
      <Text style={styles.point}>• Rotate crops every season</Text>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "white" },
  header: { fontSize: 30, fontWeight: "bold", marginBottom: 20 },
  title: { fontSize: 20, marginTop: 20, fontWeight: "bold" },
  text: { fontSize: 16, marginTop: 8, lineHeight: 22 },
  point: { fontSize: 16, marginTop: 6 },
});
