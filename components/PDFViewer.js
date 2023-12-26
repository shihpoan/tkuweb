// components/MyDocument.js
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  File,
  Font,
  Image,
} from "@react-pdf/renderer";
import QRCode from "qrcode";

// 引入字體文件
Font.register({
  family: "Noto Sans TC",
  src: "/fonts/NotoSansTC-Regular.ttf",
});

// 中文换行问题
Font.registerHyphenationCallback((word) => {
  if (word.length === 1) {
    return [word];
  }

  return Array.from(word)
    .map((char) => [char, ""])
    .reduce((arr, current) => {
      arr.push(...current);
      return arr;
    }, []);
});

// 创建样式
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Noto Sans TC",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "100%",
    justifyContent: "start",
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: "24px",
    fontWeight: 800,
    marginBottom: "20px",
  },
  content: {
    display: "flex",
    maxWidth: "400px",
    fontSize: "16px",
    fontWeight: 500,
    marginBottom: "5px",
  },
  content2: {
    display: "flex",
    fontSize: "20px",
    fontWeight: 500,
    color: "red",
    marginTop: "25px",
  },
});

// 创建文档结构
const MyDocument = ({ data }) => {
  const originalString = data.desc;
  const urlPromise = data.qrCodeUrl ? QRCode.toDataURL(data.qrCodeUrl) : null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>
            {data.name ? data.name : "請輸入內容..."}
          </Text>
          {console.log(data, "urlPromise", urlPromise, data.qrCodeUrl)}
          {data.image.length ? (
            <Image
              src={data.image[0]}
              style={{ width: "400px", height: "200px", marginBottom: "20px" }}
            />
          ) : (
            <Image
              src={"/images/river0001.jpg"}
              style={{ width: "400px", height: "200px", marginBottom: "20px" }}
            />
          )}

          <Text style={styles.content}>{originalString}</Text>
          <Text style={styles.content2}>
            {!data.qrCodeUrl
              ? `請點選 "建立教學文件" 按鈕 產生課程及課程 QrCode`
              : "課程線上系統QrCode"}
          </Text>
          {urlPromise ? (
            <Image
              src={urlPromise}
              style={{ width: "100px", height: "100px", marginBottom: "20px" }}
            />
          ) : null}
        </View>
        {/* ...其他数据渲染 */}
      </Page>
    </Document>
  );
};

export default MyDocument;
