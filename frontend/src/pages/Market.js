import { ScrollView, Text, View, StyleSheet } from "react-native";

export default function Market() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🏪 Market Information</Text>

      <Text style={styles.title}>Where Can Farmers Sell?</Text>
      <Text style={styles.point}>• APMC Mandis</Text>
      <Text style={styles.point}>• Farmer Produce Organizations (FPOs)</Text>
      <Text style={styles.point}>• Direct to Consumers</Text>
      <Text style={styles.point}>• Contract Farming</Text>
      <Text style={styles.point}>• Food Processing Units</Text>
      <Text style={styles.point}>• Online Platforms (eNAM, Krishi Mandi apps)</Text>

      <Text style={styles.title}>How to Get Better Prices</Text>
      <Text style={styles.point}>• Grade & sort produce properly</Text>
      <Text style={styles.point}>• Sell when demand is high</Text>
      <Text style={styles.point}>• Store produce safely to avoid spoilage</Text>
      <Text style={styles.point}>• Join a cooperative or FPO</Text>
      <Text style={styles.point}>• Explore organic certification</Text>

      <Text style={styles.title}>Daily Market Price Sources</Text>
      <Text style={styles.point}>• Agmarknet.gov.in</Text>
      <Text style={styles.point}>• Karnataka agricultural market website</Text>
      <Text style={styles.point}>• Local mandi price board</Text>
      <Text style={styles.point}>• KVK centers</Text>

      <Text style={styles.title}>Tips for Farmers</Text>
      <Text style={styles.point}>• Avoid selling immediately after harvest</Text>
      <Text style={styles.point}>• Use proper packaging (gunny bags, crates)</Text>
      <Text style={styles.point}>• Maintain moisture levels</Text>
      <Text style={styles.point}>• Record fertilizer/pesticide usage</Text>

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
