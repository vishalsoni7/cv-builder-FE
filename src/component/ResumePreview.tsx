import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { ResumeDocumentProps } from "../types/resume";

const ResumePreview = ({ resume }: ResumeDocumentProps) => {
  if (!resume) return <Text>No resume data available.</Text>;

  return (
    <Document>
      <Page style={styles.body}>
        {/* Header */}
        <View style={styles.section}>
          <Text style={styles.title}>{resume.fullName}</Text>
        </View>

        {/* Contact */}
        <View style={styles.contactInfo}>
          <Text>📞 {resume.number}</Text>
          <Text>💼 {resume.designation}</Text>
          <Text>✉️ {resume.email}</Text>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Summary</Text>
          <Text style={styles.text}>{resume.summary}</Text>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Skills</Text>
          <Text style={styles.text}>{resume.skills?.join(", ")}</Text>
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Experience</Text>
          <Text style={styles.text}>{resume.experience?.join(", ")}</Text>
        </View>

        {/* Projects */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Projects</Text>
          <Text style={styles.text}>{resume.projects?.join(", ")}</Text>
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Education</Text>
          <Text style={styles.text}>{resume.education?.join(", ")}</Text>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 20,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  title: {
    fontSize: 42,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    borderBottom: "1px solid black",
  },
  text: {
    fontSize: 12,
    marginTop: 5,
  },
  contactInfo: {
    fontSize: 14,
    marginTop: 5,
    display: "flex",
    justifyContent: "flex-start",
    gap: 30,
    minWidth: "100%",
  },
});

export default ResumePreview;
