import type { StaticImageData } from "next/image";

import ext_avi from "assets/images/file/extensions/avi.png";
import ext_csv from "assets/images/file/extensions/csv.png";
import ext_doc from "assets/images/file/extensions/doc.png";
import ext_exe from "assets/images/file/extensions/exe.png";
import ext_iso from "assets/images/file/extensions/iso.png";
import ext_jpg from "assets/images/file/extensions/jpg.png";
import ext_json from "assets/images/file/extensions/json.png";
import ext_m4a from "assets/images/file/extensions/m4a.png";
import ext_mov from "assets/images/file/extensions/mov.png";
import ext_mp3 from "assets/images/file/extensions/mp3.png";
import ext_mp4 from "assets/images/file/extensions/mp4.png";
import ext_pdf from "assets/images/file/extensions/pdf.png";
import ext_png from "assets/images/file/extensions/png.png";
import ext_ppt from "assets/images/file/extensions/ppt.png";
import ext_rar from "assets/images/file/extensions/rar.png";
import ext_svg from "assets/images/file/extensions/svg.png";
import ext_txt from "assets/images/file/extensions/txt.png";
import ext_webp from "assets/images/file/extensions/webp.png";
import ext_xls from "assets/images/file/extensions/xls.png";
import ext_xml from "assets/images/file/extensions/xml.png";
import ext_zip from "assets/images/file/extensions/zip.png";

import ext_blank from "assets/images/file/extensions/blank.png";

export const FileExtensionIcons: Record<string, StaticImageData> = {
    avi: ext_avi,
    csv: ext_csv,
    doc: ext_doc,
    docx: ext_doc,
    exe: ext_exe,
    iso: ext_iso,
    jpg: ext_jpg,
    jpeg: ext_jpg,
    json: ext_json,
    m4a: ext_m4a,
    mov: ext_mov,
    mp3: ext_mp3,
    mp4: ext_mp4,
    pdf: ext_pdf,
    png: ext_png,
    ppt: ext_ppt,
    rar: ext_rar,
    svg: ext_svg,
    txt: ext_txt,
    webp: ext_webp,
    xls: ext_xls,
    xlsx: ext_xls,
    xml: ext_xml,
    zip: ext_zip,

    blank: ext_blank
};

import dir_simple from "assets/images/file/directory/folder.png";

export const FileDirectoryIcons: Record<string, StaticImageData> = {
    folder: dir_simple
};
