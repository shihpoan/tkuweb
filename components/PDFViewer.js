// components/MyDocument.js
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// 创建样式
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// 创建文档结构
const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>{data.title}</Text>
      </View>
      <View style={styles.section}>
        <Text>{data.content}</Text>
      </View>
      {/* ...其他数据渲染 */}
    </Page>
  </Document>
);

export default MyDocument;
