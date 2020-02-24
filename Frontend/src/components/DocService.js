import { savePDF } from '@progress/kendo-react-pdf';

class DocService {
  createPdf = (html) => {
    savePDF(html, {
      paperSize: 'A1',
      fileName: 'crud.pdf',
      margin: 3
    })
  }
}

const Doc = new DocService();
export default Doc;