export interface MaterialTopic {
  id: string;
  title: string;
  subtitle?: string;
  category: "Kekuatan" | "Peluang" | "Kelemahan" | "Tantangan" | "Pancasila";
  description: string;
  keyPoints: string[];
  example?: string;
  iconName: string;
  badgeBg: string;
  badgeText: string;
  accentColor: string;
}

export interface IdeologyComparison {
  aspek: string;
  pancasila: string;
  komunisme: string;
  kapitalisme: string;
}

export interface SilaPancasila {
  number: number;
  sila: string;
  title: string;
  description: string;
  globalExamples: string[];
  iconName: string;
  imagePath?: string;
  color: string;
}

export const KATA_PENGANTAR = {
  title: "Kata Pengantar Media Pembelajaran",
  paragraphs: [
    "Indonesia merupakan negara yang memiliki banyak potensi, baik dari sumber daya alam, sumber daya manusia, maupun keberagaman budaya. Potensi tersebut menjadi modal penting bagi bangsa Indonesia untuk terus berkembang dan bersaing di era global.",
    "Namun, di samping berbagai kelebihan tersebut, Indonesia juga masih menghadapi beberapa tantangan dan permasalahan dalam pembangunan. Oleh karena itu, diperlukan analisis SWOT untuk mengetahui kekuatan, kelemahan, peluang, dan ancaman yang dimiliki Indonesia.",
    "Analisis ini dapat membantu melihat kondisi Indonesia secara lebih jelas serta menentukan langkah yang tepat untuk menghadapi berbagai tantangan di masa depan.",
    "Melalui pembelajaran Bab 2 “Ber-Pancasila dalam Kehidupan Global”, kita diajak untuk mengenali berbagai kekuatan dan peluang yang dimiliki Indonesia, memahami kelemahan serta tantangan yang harus dihadapi, sekaligus memahami pentingnya Pancasila sebagai pemandu dalam menghadapi perkembangan kehidupan global.",
    "Website ini dibuat sebagai media pembelajaran agar materi dapat dipelajari dengan lebih mudah, menarik, terstruktur, dan interaktif."
  ]
};

export const PENGANTAR_BAB2 = {
  title: "Pengantar Bab 2: Ber-Pancasila dalam Kehidupan Global",
  subtitle: "Memahami Posisi Indonesia Melalui Analisis SWOT",
  description: "Dalam era kehidupan global yang saling terhubung, bangsa Indonesia memiliki potensi melimpah sekaligus dihadapkan pada berbagai persoalan multidimensional. Untuk memetakan kondisi bangsa secara sistematis, materi Bab 2 memanfaatkan pendekatan Analisis SWOT (Strengths, Weaknesses, Opportunities, Threats).",
  internalVsExternal: {
    internalTitle: "Faktor Internal (Dalam Negeri)",
    internalDesc: "Merupakan karakteristik, aset, maupun permasalahan yang berasal dari dalam bangsa Indonesia sendiri.",
    internalItems: [
      { type: "Strength (Kekuatan)", desc: "Potensi internal positif seperti Pancasila, wilayah strategis, bonus demografi, kemajemukan, dan kekayaan alam." },
      { type: "Weakness (Kelemahan)", desc: "Keterbatasan internal seperti kualitas SDM, korupsi, pembangunan belum merata, dan kerawanan bencana." }
    ],
    externalTitle: "Faktor Eksternal (Lingkungan Global)",
    externalDesc: "Merupakan kondisi, tren, dan pengaruh yang berasal dari luar/dunia internasional.",
    externalItems: [
      { type: "Opportunity (Peluang)", desc: "Kesempatan global seperti pariwisata internasional, kemajuan teknologi, pasar global, dan kerja sama antardunia." },
      { type: "Threat (Tantangan)", desc: "Pengaruh luar yang berisiko merusak jati diri bangsa seperti individualisme, kapitalisme murni, kosmopolitanisme, dan ideologi bertentangan." }
    ]
  }
};

export const KEKUATAN_INDONESIA: MaterialTopic[] = [
  {
    id: "pancasila",
    title: "5.1 Pancasila",
    subtitle: "Ideologi & Pemandu Utama Bangsa",
    category: "Kekuatan",
    description: "Pancasila merupakan kekuatan fundamental bangsa Indonesia yang berfungsi sebagai dasar negara, pandangan hidup, ideologi nasional, serta pemersatu keberagaman di tengah derasnya arus globalisasi.",
    keyPoints: [
      "Falsafah dan Dasar Negara Republik Indonesia",
      "Pandangan hidup (way of life) yang membimbing moral bangsa",
      "Ideologi terbuka yang adaptif namun tetap memegang teguh jati diri",
      "Pemersatu ribuan suku, agama, dan budaya di seluruh pelosok Nusantara"
    ],
    example: "Di tingkat internasional, nilai-nilai Pancasila seperti musyawarah dan perdamaian dunia diakui sebagai kontribusi positif Indonesia dalam misi perdamaian PBB.",
    iconName: "ShieldCheck",
    badgeBg: "bg-blue-500/10 dark:bg-blue-500/20",
    badgeText: "text-blue-600 dark:text-blue-400",
    accentColor: "from-blue-500 to-indigo-600"
  },
  {
    id: "posisi-geografis",
    title: "5.2 Posisi Geografis Indonesia",
    subtitle: "Negara Kepulauan di Silang Dunia",
    category: "Kekuatan",
    description: "Indonesia terletak di posisi sangat strategis di antara dua benua (Asia dan Australia) serta dua samudra (Hindia dan Pasifik), menjadikan Indonesia jalur utama perdagangan dunia.",
    keyPoints: [
      "Negara kepulauan terbesar di dunia dengan lebih dari 17.000 pulau",
      "Menguasai choke points (selat kunci) perdagangan internasional seperti Selat Malaka, Lombok, dan Sunda",
      "Luas wilayah laut yang melimpah mendukung potensi ekonomi maritim (poros maritim dunia)",
      "Posisi geopolitik strategis dalam dinamika diplomasi regional ASEAN dan internasional"
    ],
    example: "Ribuan kapal kargo internasional setiap hari melewati Selat Malaka dan lalu lintas perairan Indonesia.",
    iconName: "Globe",
    badgeBg: "bg-sky-500/10 dark:bg-sky-500/20",
    badgeText: "text-sky-600 dark:text-sky-400",
    accentColor: "from-sky-500 to-blue-600"
  },
  {
    id: "bonus-demografi",
    title: "5.3 Bonus Demografi",
    subtitle: "Melimpahnya Usia Produktif",
    category: "Kekuatan",
    description: "Bonus demografi adalah kondisi di mana jumlah penduduk usia produktif (15–64 tahun) lebih besar dibandingkan penduduk usia tidak produktif, menjadi mesin penggerak pembangunan.",
    keyPoints: [
      "Proporsi penduduk usia produktif mencapai lebih dari 60% total populasi",
      "Potensi tenaga kerja melimpah untuk menopang pertumbuhan ekonomi nasional",
      "Kesempatan emas akselerasi industri dan inovasi jika didukung peningkatan kualitas SDM",
      "Pasar domestik yang besar memikat investasi global"
    ],
    example: "Generasi muda Indonesia banyak melahirkan startup digital dan inovasi kreatif yang bersaing secara global.",
    iconName: "Users",
    badgeBg: "bg-indigo-500/10 dark:bg-indigo-500/20",
    badgeText: "text-indigo-600 dark:text-indigo-400",
    accentColor: "from-indigo-500 to-purple-600"
  },
  {
    id: "kemajemukan",
    title: "5.4 Kemajemukan Indonesia",
    subtitle: "Kekuatan dalam Keberagaman Bhinneka Tunggal Ika",
    category: "Kekuatan",
    description: "Indonesia dihuni ratusan suku bangsa, budaya, bahasa daerah, agama, dan tradisi. Keberagaman ini menjadi kekayaan modal sosial apabila dikelola dengan nilai toleransi dan Pancasila.",
    keyPoints: [
      "Ratusan suku bangsa dan bahasa daerah yang memperkaya kebudayaan nasional",
      "Kerukunan antarumat beragama berlandaskan Bhinneka Tunggal Ika",
      "Kekuatan kearifan lokal (local wisdom) dalam menyelesaikan konflik secara kekeluargaan",
      "Daya tarik modal kebudayaan yang unik di mata masyarakat internasional"
    ],
    example: "Tradisi gotong royong dan musyawarah warga desa di berbagai daerah di Indonesia.",
    iconName: "HeartHandshake",
    badgeBg: "bg-purple-500/10 dark:bg-purple-500/20",
    badgeText: "text-purple-600 dark:text-purple-400",
    accentColor: "from-purple-500 to-pink-600"
  },
  {
    id: "kekayaan-alam",
    title: "5.5 Kekayaan Alam & Biodiversitas",
    subtitle: "Modal Utama Pembangunan dan Sumber Daya",
    category: "Kekuatan",
    description: "Melimpahnya sumber daya mineral, hutan hujan tropis, serta keanekaragaman hayati darat dan laut menjadikan Indonesia sebagai salah satu paru-paru dunia dan lumbung energi.",
    keyPoints: [
      "Kekayaan barang tambang (nikel, tembaga, emas, bauksit, minyak, dan gas)",
      "Salah satu pusat biodiversitas terluas di dunia (Megabiodiversity Country)",
      "Potensi energi terbarukan melimpah (geothermal, surya, hidro, dan angin)",
      "Diperlukan pengelolaan yang bijak, berkelanjutan, dan berwawasan lingkungan"
    ],
    example: "Hilirisasi industri nikel di Indonesia menjadi daya tarik utama produsen baterai kendaraan listrik global.",
    iconName: "Trees",
    badgeBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    badgeText: "text-emerald-600 dark:text-emerald-400",
    accentColor: "from-emerald-500 to-teal-600"
  },
  {
    id: "kekuatan-pertahanan",
    title: "5.6 Kekuatan Pertahanan / Militer",
    subtitle: "Kesiapsiagaan Menjaga Kedaulatan NKRI",
    category: "Kekuatan",
    description: "Pertahanan Indonesia menggunakan Sistem Pertahanan dan Keamanan Rakyat Semesta (Sishankamrata) yang memadukan kekuatan militer profesional dan partisipasi seluruh rakyat.",
    keyPoints: [
      "TNI sebagai komponen utama didukung rakyat sebagai komponen pendukung",
      "Kesiapsiagaan menjaga integritas wilayah darat, laut, dan udara NKRI",
      "Peran aktif dalam misi perdamaian PBB (Contingent Garuda)",
      "Penguatan kemandirian industri pertahanan dalam negeri"
    ],
    example: "Prajurit TNI yang rutin dikirim dalam Misi Perdamaian PBB di berbagai kawasan konflik dunia.",
    iconName: "Shield",
    badgeBg: "bg-amber-500/10 dark:bg-amber-500/20",
    badgeText: "text-amber-600 dark:text-amber-400",
    accentColor: "from-amber-500 to-orange-600"
  }
];

export const PELUANG_INDONESIA: MaterialTopic[] = [
  {
    id: "pariwisata",
    title: "Pariwisata Internasional",
    subtitle: "Destinasi Alam & Budaya Dunia",
    category: "Peluang",
    description: "Pesona keindahan alam, situs bersejarah, dan kebudayaan unik Indonesia menjadi daya tarik utama wisatawan mancanegara yang mendorong pertumbuhan ekonomi rakyat.",
    keyPoints: [
      "Membuka lapangan kerja baru di sektor jasa, perhotelan, dan UMKM kreatif",
      "Meningkatkan pendapatan devisa negara dari wisatawan asing",
      "Memperkenalkan nilai ramah tamah dan kebudayaan Indonesia ke kancah global",
      "Pengembangan destinasi super prioritas (Bali, Labuan Bajo, Borobudur, Danau Toba, dll.)"
    ],
    example: "Pengakuan UNESCO terhadap berbagai warisan budaya Indonesia seperti Batik dan Pencak Silat.",
    iconName: "Palmtree",
    badgeBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    badgeText: "text-emerald-600 dark:text-emerald-400",
    accentColor: "from-emerald-500 to-green-600"
  },
  {
    id: "perkembangan-ekonomi",
    title: "Perkembangan Ekonomi Global",
    subtitle: "Peluang Menjadi Kekuatan Ekonomi Dunia",
    category: "Peluang",
    description: "Integrasi ekonomi regional dan global membuka ruang perluasan pasar produk Indonesia serta menarik investasi asing langsung (FDI).",
    keyPoints: [
      "Peluang penetrasi ekspor produk UMKM unggulan ke pasar internasional",
      "Kemitraan strategis perdagangan di kawasan ASEAN dan dunia",
      "Transformasi ekonomi digital dan platform e-commerce global"
    ],
    example: "Ekspor produk kopi, rempah, dan manufaktur Indonesia yang semakin diminati di Eropa dan Amerika.",
    iconName: "TrendingUp",
    badgeBg: "bg-teal-500/10 dark:bg-teal-500/20",
    badgeText: "text-teal-600 dark:text-teal-400",
    accentColor: "from-teal-500 to-cyan-600"
  },
  {
    id: "pemanfaatan-sd",
    title: "Pemanfaatan Sumber Daya Strategis",
    subtitle: "Hilirisasi & Nilai Tambah Industri",
    category: "Peluang",
    description: "Pengolahan bahan mentah di dalam negeri (hilirisasi) memberikan nilai tambah berlipat ganda bagi perekonomian nasional.",
    keyPoints: [
      "Mengubah Indonesia dari pengekspor bahan mentah menjadi produsen barang jadi/setengah jadi",
      "Meningkatkan penerapan teknologi industri modern",
      "Menciptakan lapangan kerja berkualitas tinggi bagi lulusan dalam negeri"
    ],
    example: "Pembangunan smelter dan pabrik pengolahan hasil tambang lokal.",
    iconName: "Zap",
    badgeBg: "bg-cyan-500/10 dark:bg-cyan-500/20",
    badgeText: "text-cyan-600 dark:text-cyan-400",
    accentColor: "from-cyan-500 to-blue-600"
  },
  {
    id: "perkembangan-global",
    title: "Perkembangan IPTEK Global",
    subtitle: "Transfer Teknologi & Kerja Sama Internasional",
    category: "Peluang",
    description: "Kemajuan pesat di bidang sains, teknologi digital, dan komunikasi internasional memberi kemudahan bagi anak bangsa untuk belajar dan berkolaborasi global.",
    keyPoints: [
      "Akses terhadap pendidikan global dan riset pengetahuan dunia",
      "Pengembangan teknologi ramah lingkungan dan energi terbarukan",
      "Kemudahan kolaborasi antarnegara dalam mengatasi isu bersama (perubahan iklim, kesehatan)"
    ],
    example: "Beasiswa internasional dan kolaborasi riset pelajar Indonesia dengan universitas terkemuka dunia.",
    iconName: "Cpu",
    badgeBg: "bg-blue-500/10 dark:bg-blue-500/20",
    badgeText: "text-blue-600 dark:text-blue-400",
    accentColor: "from-blue-500 to-indigo-600"
  }
];

export const KELEMAHAN_INDONESIA: MaterialTopic[] = [
  {
    id: "kualitas-sdm",
    title: "7.1 Kualitas Sumber Daya Manusia",
    subtitle: "Tantangan Pendidikan & Keterampilan Kerja",
    category: "Kelemahan",
    description: "Meskipun populasi usia produktif besar, tingkat literasi, penguasaan ilmu pengetahuan modern, dan keterampilan teknis SDM masih perlu ditingkatkan agar sepadan dengan standar global.",
    keyPoints: [
      "Kualitas pendidikan yang belum merata di seluruh pelosok daerah",
      "Rendahnya tingkat literasi sains, matematika, dan teknologi digital di beberapa kalangan",
      "Pentingnya vokasi dan pelatihan keterampilan industri yang adaptif terhadap perubahan teknologi"
    ],
    example: "Banyak lulusan yang masih kesulitan bersaing di dunia kerja karena keahlian yang kurang relevan.",
    iconName: "GraduationCap",
    badgeBg: "bg-amber-500/10 dark:bg-amber-500/20",
    badgeText: "text-amber-600 dark:text-amber-400",
    accentColor: "from-amber-500 to-rose-600"
  },
  {
    id: "kondisi-tenaga-kerja",
    title: "7.2 Kondisi Tenaga Kerja",
    subtitle: "Pengangguran Terdidik & Skill Mismatch",
    category: "Kelemahan",
    description: "Terdapat persoalan kesenjangan antara kualifikasi lulusan lembaga pendidikan dengan kebutuhan pasar kerja (skill mismatch) serta tingginya proporsi pekerja di sektor informal.",
    keyPoints: [
      "Tingkat pengangguran terbuka di kalangan pemuda terdidik",
      "Dominasi tenaga kerja di sektor informal dengan perlindungan sosial yang minim",
      "Perlunya peningkatan sertifikasi kompetensi dan link and match dunia pendidikan-industri"
    ],
    example: "Perusahaan kesulitan mencari spesialis teknis padahal angka pencari kerja melimpah.",
    iconName: "Briefcase",
    badgeBg: "bg-orange-500/10 dark:bg-orange-500/20",
    badgeText: "text-orange-600 dark:text-orange-400",
    accentColor: "from-orange-500 to-amber-600"
  },
  {
    id: "pembangunan-tidak-merata",
    title: "7.3 Pembangunan Belum Merata",
    subtitle: "Ketimpangan Infrastruktur & Fasilitas Antardaerah",
    category: "Kelemahan",
    description: "Pembangunan infrastruktur, pendidikan, dan fasilitas kesehatan masih terpusat di wilayah Jawa, sementara wilayah 3T (Tertinggal, Terdepan, Terluar) masih memerlukan akselerasi.",
    keyPoints: [
      "Ketimpangan ekonomi antara pulau Jawa dan luar Jawa",
      "Akses terhadap internet, listrik, dan jalan memadai di daerah terpencil masih terbatas",
      "Potensi kesenjangan kesejahteraan sosial antarwarga negara"
    ],
    example: "Siswa di daerah pelosok kesulitan mengakses materi pembelajaran digital karena keterbatasan sinyal dan daya listrik.",
    iconName: "Building2",
    badgeBg: "bg-rose-500/10 dark:bg-rose-500/20",
    badgeText: "text-rose-600 dark:text-rose-400",
    accentColor: "from-rose-500 to-red-600"
  },
  {
    id: "korupsi",
    title: "7.4 Korupsi",
    subtitle: "Penghambat Utama Kesejahteraan Bangsa",
    category: "Kelemahan",
    description: "Praktik korupsi merugikan keuangan negara, merusak iklim investasi, dan menghambat pemenuhan hak-hak rakyat atas fasilitas publik yang berkualitas.",
    keyPoints: [
      "Mengurangi anggaran pembangunan infrastruktur, pendidikan, dan kesehatan",
      "Merusak kepercayaan publik terhadap lembaga pemerintahan dan hukum",
      "Pentingnya pembiasaan nilai kejujuran, transparansi, dan integritas sejak dini"
    ],
    example: "Penyalahgunaan dana bantuan sosial atau anggaran proyek fasilitas umum.",
    iconName: "AlertTriangle",
    badgeBg: "bg-red-500/10 dark:bg-red-500/20",
    badgeText: "text-red-600 dark:text-red-400",
    accentColor: "from-red-500 to-rose-700"
  },
  {
    id: "pungutan-liar",
    title: "7.5 Pungutan Liar (Pungli)",
    subtitle: "Pelanggaran Hukum & Ketidakadilan Pelayanan",
    category: "Kelemahan",
    description: "Pungli dalam pelayanan publik membebani masyarakat, memicu ekonomi biaya tinggi (high-cost economy), dan bertentangan dengan prinsip keadilan sosial.",
    keyPoints: [
      "Pungutan tidak resmi yang membebani masyarakat kecil dan pelaku usaha",
      "Menghambat efisiensi birokrasi dan kepastian hukum",
      "Perlunya digitalisasi pelayanan publik untuk menutup celah transaksi ilegal"
    ],
    example: "Praktik calo dan pengungutan biaya tak resmi pada pembuatan dokumen administrasi.",
    iconName: "Ban",
    badgeBg: "bg-red-600/10 dark:bg-red-600/20",
    badgeText: "text-red-700 dark:text-red-400",
    accentColor: "from-red-600 to-pink-600"
  },
  {
    id: "rawan-bencana",
    title: "7.6 Kondisi Indonesia yang Rawan Bencana",
    subtitle: "Geografis Ring of Fire & Kesiapsiagaan Mitigasi",
    category: "Kelemahan",
    description: "Posisi Indonesia di lingkaran cincin api pasifik (Ring of Fire) dan pertemuan lempeng tektonik membuat wilayah Nusantara kerap mengalami bencana gempa, tsunami, gunung meletus, dan banjir.",
    keyPoints: [
      "Kerentanan terhadap gempa bumi, letusan gunung api, tsunami, banjir, dan tanah longsor",
      "Risiko kerugian jiwa, material, dan kerusakan infrastruktur yang terjadi berulang",
      "Pentingnya literasi mitigasi bencana, edukasi kesiapsiagaan, dan infrastruktur tahan gempa"
    ],
    example: "Bencana gempa dan tsunami yang melanda daerah pesisir memerlukan tata ruang berbasis mitigasi.",
    iconName: "Flame",
    badgeBg: "bg-amber-600/10 dark:bg-amber-600/20",
    badgeText: "text-amber-700 dark:text-amber-400",
    accentColor: "from-amber-600 to-red-600"
  }
];

export const TANTANGAN_INDONESIA: MaterialTopic[] = [
  {
    id: "individualisme",
    title: "Individualisme",
    subtitle: "Pengikisan Semangat Gotong Royong",
    category: "Tantangan",
    description: "Paham atau gaya hidup yang mengagungkan kepentingan diri sendiri di atas kepentingan bersama, memicu sifat apatis dan lunturnya kepedulian sosial di masyarakat.",
    keyPoints: [
      "Menurunnya ikatan kebersamaan dan tradisi gotong royong warga",
      "Meningkatnya rasa acuh tak acuh terhadap kesulitan tetangga atau lingkungan",
      "Perlunya revitalisasi nilai kekeluargaan dan musyawarah Pancasila"
    ],
    example: "Enggan terlibat dalam kegiatan kerja bakti lingkungan karena merasa tidak ada keuntungan pribadi.",
    iconName: "UserX",
    badgeBg: "bg-purple-500/10 dark:bg-purple-500/20",
    badgeText: "text-purple-600 dark:text-purple-400",
    accentColor: "from-purple-500 to-indigo-600"
  },
  {
    id: "kosmopolitanisme",
    title: "Kosmopolitanisme",
    subtitle: "Tantangan Jati Diri & Nasionalisme",
    category: "Tantangan",
    description: "Pandangan bahwa seluruh manusia adalah warga dunia tanpa batas negara. Jika tidak disikapi dengan kritis, paham ini berisiko mengaburkan rasa cinta tanah air dan identitas kebangsaan.",
    keyPoints: [
      "Potensi pudarnya kebanggaan terhadap bahasa dan kebudayaan daerah/nasional",
      "Kecenderungan menganggap budaya luar selalu lebih unggul daripada kebudayaan sendiri",
      "Pancasila mengajarkan internasionalisme (kemanusiaan) yang tetap berakar pada nasionalisme"
    ],
    example: "Generasi muda lebih bangga menggunakan bahasa luar daripada bahasa Indonesia dalam komunikasi harian.",
    iconName: "Globe2",
    badgeBg: "bg-indigo-500/10 dark:bg-indigo-500/20",
    badgeText: "text-indigo-600 dark:text-indigo-400",
    accentColor: "from-indigo-500 to-blue-600"
  },
  {
    id: "kapitalisme",
    title: "Kapitalisme Murni",
    subtitle: "Risiko Ketimpangan & Penguasaan Modal",
    category: "Tantangan",
    description: "Sistem ekonomi yang menyerahkan seluruh kegiatan ekonomi pada pasar bebas dan pemilik modal privat, berisiko menciptakan persaingan tidak sehat dan mengabaikan kesejahteraan rakyat kecil.",
    keyPoints: [
      "Dominasi kekuatan pemilik modal besar yang menggilas Usaha Mikro Kecil dan Menengah (UMKM)",
      "Pelemahan peran negara dalam menjamin keadilan sosial bagi seluruh rakyat",
      "Bertentangan dengan Sistem Ekonomi Pancasila yang berbasis asas kekeluargaan (Pasal 33 UUD 1945)"
    ],
    example: "Pemberlakuan pasar bebas tanpa perlindungan bagi petani dan perajin lokal.",
    iconName: "Coins",
    badgeBg: "bg-amber-500/10 dark:bg-amber-500/20",
    badgeText: "text-amber-600 dark:text-amber-400",
    accentColor: "from-amber-500 to-yellow-600"
  },
  {
    id: "ideologi-asing",
    title: "Ideologi / Paham Tidak Sesuai",
    subtitle: "Ancaman Komunisme, Radicalism, & Extremism",
    category: "Tantangan",
    description: "Masuknya ideologi radikal atau ajaran ateisme/komunisme serta ekstremisme lewat jejaring global yang berupaya menggantikan Pancasila sebagai ideologi tunggal negara.",
    keyPoints: [
      "Paham ateisme/komunisme menolak keberadaan Tuhan Yang Maha Esa",
      "Paham radikalisme/ekstremisme memaksakan kehendak dengan kekerasan dan intoleransi",
      "Pancasila menjamin kebebasan beragama yang beradab dan menentang segala bentuk kekerasan"
    ],
    example: "Penyebaran narasi propaganda radikal di media sosial yang mengadu domba antarkelompok.",
    iconName: "ShieldAlert",
    badgeBg: "bg-red-500/10 dark:bg-red-500/20",
    badgeText: "text-red-600 dark:text-red-400",
    accentColor: "from-red-500 to-rose-600"
  }
];

export const TABEL_IDEOLOGI: IdeologyComparison[] = [
  {
    aspek: "Konsep Ketuhanan & Agama",
    pancasila: "Mengakui Tuhan Yang Maha Esa; agama menjadi landasan moral, etika, dan dilindungi negara.",
    komunisme: "Ateisme (tidak mempercayai Tuhan); agama dianggap candu masyarakat yang menghambat kemajuan.",
    kapitalisme: "Sekularisme; agama dipisahkan dari urusan negara dan ekonomi (urusan privat masing-masing)."
  },
  {
    aspek: "Kedudukan Individu & Masyarakat",
    pancasila: "Keseimbangan harmoni antara hak individu dan kewajiban sosial kemasyarakatan (gotong royong).",
    komunisme: "Negara/kelompok menguasai segalanya; hak individu dan kepemilikan pribadi sangat dibatasi.",
    kapitalisme: "Kebebasan individu diutamakan di atas segalanya; persaingan bebas antarindividu."
  },
  {
    aspek: "Sistem Perekonomian",
    pancasila: "Ekonomi kekeluargaan (Pasal 33 UUD 1945); cabang produksi penting dikuasai negara untuk kemakmuran rakyat.",
    komunisme: "Ekonomi terpusat (etatisme); seluruh aset dan alat produksi dimiliki dan diatur penuh oleh negara.",
    kapitalisme: "Pasar bebas (laissez-faire); mekanisme pasar dan persaingan pemodal privat menentukan harga."
  },
  {
    aspek: "Tujuan Berbangsa & Bernegara",
    pancasila: "Mewujudkan keadilan sosial, perdamaian abadi, dan persatuan dalam keberagaman Bhinneka Tunggal Ika.",
    komunisme: "Menciptakan masyarakat tanpa kelas melalui perjuangan kelas dan penguasaan mutlak.",
    kapitalisme: "Memaksimalkan keuntungan materiil individu dan pertumbuhan akumulasi modal privat."
  }
];

export const PANCASILA_SEBAGAI_PEMANDU = {
  title: "C. Pancasila sebagai Pemandu",
  subtitle: "Filter & Pedoman Utama Menyikapi Perkembangan Global",
  description: "Dalam menghadapi era globalisasi, bangsa Indonesia tidak harus menolak seluruh perkembangan dunia luar. Indonesia secara terbuka dapat menerima hal-hal positif seperti kemajuan sains, teknologi modern, serta kerja sama antardunia. Namun, seluruh pengaruh tersebut harus disaring secara kritis menggunakan nilai-nilai Pancasila sebagai filter dan pedoman hidup.",
  filterPrinciples: [
    {
      title: "Menerima Kemajuan IPTEK",
      desc: "Memanfaatkan teknologi informasi, inovasi medis, dan energi hijau global untuk kesejahteraan rakyat."
    },
    {
      title: "Menolak Pengaruh Negatif",
      desc: "Menyaring konsumerisme berlebihan, individualisme apatis, dan paham ekstrem yang merusak moral bangsa."
    },
    {
      title: "Aktif dalam Diplomasi Dunia",
      desc: "Ikut serta melaksanakan ketertiban dunia berdasarkan kemerdekaan, perdamaian abadi, dan keadilan sosial."
    }
  ]
};

export const SILA_PANCASILA_LIST: SilaPancasila[] = [
  {
    number: 1,
    sila: "Sila ke-1",
    title: "Ketuhanan Yang Maha Esa",
    description: "Menjadi landasan spiritual dalam berinteraksi dengan masyarakat global yang beragam kepercayaan.",
    globalExamples: [
      "Saling menghormati kebebasan beragama di tingkat internasional",
      "Menjaga toleransi antarumat beragama di lingkungan lintas negara",
      "Tidak memaksakan kehendak atau keyakinan agama kepada pihak lain"
    ],
    iconName: "Sun",
    imagePath: "/images/sila/sila1.png",
    color: "from-amber-400 to-yellow-600"
  },
  {
    number: 2,
    sila: "Sila ke-2",
    title: "Kemanusiaan yang Adil dan Beradab",
    description: "Menjunjung tinggi nilai kemanusiaan universal tanpa membedakan ras, suku, maupun kebangsaan.",
    globalExamples: [
      "Aktif memberikan bantuan kemanusiaan pada korban perang/bencana di luar negeri",
      "Menolak segala bentuk diskriminasi, rasialisme, dan pelanggaran Hak Asasi Manusia (HAM)",
      "Menghormati kesetaraan derajat sesama warga dunia"
    ],
    iconName: "Heart",
    imagePath: "/images/sila/sila2.png",
    color: "from-rose-500 to-pink-600"
  },
  {
    number: 3,
    sila: "Sila ke-3",
    title: "Persatuan Indonesia",
    description: "Memperkuat rasa cinta tanah air dan menjaga keutuhan NKRI di tengah gempuran budaya luar.",
    globalExamples: [
      "Bangga menggunakan produk dan melestarikan budaya kebangsaan di kancah dunia",
      "Menjaga persatuan dan gotong royong sesama warga negara di mana pun berada",
      "Menolak narasi pengadudombaan yang merusak kedaulatan bangsa"
    ],
    iconName: "Shield",
    imagePath: "/images/sila/sila3.png",
    color: "from-blue-500 to-indigo-600"
  },
  {
    number: 4,
    sila: "Sila ke-4",
    title: "Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan",
    description: "Mengutamakan prinsip musyawarah mufakat dan kesetaraan dalam mengambil keputusan bersama.",
    globalExamples: [
      "Menghargai perbedaan pendapat dalam forum diplomasi internasional",
      "Mengutamakan dialog damai dan musyawarah daripada kekerasan fisik/perang",
      "Bersikap demokratis dan bertanggung jawab dalam pergaulan dunia"
    ],
    iconName: "UserCheck",
    imagePath: "/images/sila/sila4.png",
    color: "from-purple-500 to-violet-600"
  },
  {
    number: 5,
    sila: "Sila ke-5",
    title: "Keadilan Sosial bagi Seluruh Rakyat Indonesia",
    description: "Mendorong keadilan, kesejahteraan merata, serta kepedulian terhadap lingkungan dan sesama.",
    globalExamples: [
      "Mendukung pemanfaatan sumber daya dunia secara adil dan ramah lingkungan",
      "Menjaga kesederhanaan dan gaya hidup empati di tengah pola konsumtif global",
      "Mendorong pemerataan akses pendidikan dan ekonomi bagi masyarakat berpendapatan rendah"
    ],
    iconName: "Scale",
    imagePath: "/images/sila/sila5.png",
    color: "from-emerald-500 to-teal-600"
  }
];

export const RANGKUMAN_BAB2 = {
  title: "Rangkuman Materi Bab 2",
  items: [
    {
      label: "Kekuatan (Strengths)",
      desc: "Indonesia memiliki modal luar biasa meliputi nilai Pancasila, lokasi geografis strategis, bonus demografi, keberagaman Bhinneka Tunggal Ika, kekayaan alam melimpah, dan Sishankamrata."
    },
    {
      label: "Kelemahan (Weaknesses)",
      desc: "Indonesia masih dihadapkan pada keterbatasan kualitas SDM, masalah tenaga kerja, ketimpangan pembangunan antardaerah, ancaman korupsi, pungli, serta kerentanan bencana alam."
    },
    {
      label: "Peluang (Opportunities)",
      desc: "Perkembangan era global membuka potensi besar pariwisata internasional, ekspansi pasar ekonomi, hilirisasi industri, serta adopsi kemajuan IPTEK."
    },
    {
      label: "Tantangan (Threats)",
      desc: "Arus globalisasi membawa pengaruh seperti individualisme, kosmopolitanisme berlebihan, kapitalisme murni, dan paham yang bertentangan dengan jati diri bangsa."
    },
    {
      label: "Pancasila (Filter & Pedoman)",
      desc: "Pancasila menjadi kompas dan pedoman hidup agar Indonesia mampu bersaing secara global tanpa kehilangan identitas kebangsaan."
    }
  ]
};

export const KESIMPULAN_BAB2 = [
  "Indonesia merupakan bangsa yang dianugerahi kekayaan melimpah dan potensi strategis luar biasa. Melalui pemetaan analisis SWOT, kita dapat memahami dengan jernih letak kekuatan serta peluang yang wajib dioptimalkan demi kemajuan bangsa.",
  "Di sisi lain, kelemahan internal dan tantangan kehidupan global bukanlah alasan untuk berkecil hati. Mengenali kekurangan seperti kualitas SDM, ketimpangan pembangunan, dan persoalan korupsi justru menjadi pijakan awal untuk melakukan perbaikan secara konsisten.",
  "Dalam berinteraksi dengan dunia internasional, Indonesia tidak boleh menutup diri maupun menelan mentah-mentah seluruh budaya asing. Sikap yang tepat adalah bersikap terbuka terhadap ilmu pengetahuan dan kemajuan teknologi, sembari secara kritis menyaring setiap pengaruh budaya luar.",
  "Pancasila adalah kompas dan pemandu utama bangsa Indonesia. Dengan mengamalkan kelima sila dalam kehidupan sehari-hari, kita optimis mampu menjadikan Indonesia sebagai bangsa yang maju, adil, beradab, dan disegani di kancah kehidupan global."
];

export const SUMBER_MATERI = {
  title: "Sumber Utama Materi",
  bookTitle: "Pendidikan Pancasila untuk SMA/MA/SMK/MAK Kelas XII",
  authors: ["Ida Rohayani", "Hatim Gazali", "Dwi Astuti Setiawan"],
  publisher: "Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi Republik Indonesia",
  center: "Pusat Perbukuan",
  edition: "Edisi Revisi 2023",
  isbn: "978-623-194-624-9",
  chapter: "Bab 2 – Ber-Pancasila dalam Kehidupan Global",
  note: "Materi pada website ini dirangkum secara setia berlandaskan Buku Teks Utama Pendidikan Pancasila Kelas XII Kemendikbudristek RI Edisi Revisi 2023."
};

export const PANCASILA_QUIZ_QUESTIONS = [
  {
    id: 1,
    scenario: "Budi adalah siswa SMK yang gemar belajar coding secara mandiri melalui platform global. Ia memanfaatkan AI dan riset internasional untuk membuat aplikasi pertanian cerdas bagi petani lokal di desanya.",
    question: "Tindakan Budi mencerminkan penerapan Pancasila dalam kehidupan global pada aspek apa?",
    options: [
      { id: "a", text: "Menolak seluruh teknologi luar demi budaya lokal" },
      { id: "b", text: "Menerima perkembangan IPTEK global untuk kemanfaatan dan kesejahteraan rakyat (Sila 5)" },
      { id: "c", text: "Menerapkan gaya hidup kosmopolitan tanpa menghiraukan lingkungan lokal" },
      { id: "d", text: "Mempraktikkan individualisme di dunia digital" }
    ],
    correctOptionId: "b",
    explanation: "Memanfaatkan teknologi modern global untuk menyelesaikan masalah lokal (aplikasi pertanian) adalah wujud nyata penerimaan IPTEK positif yang berlandaskan Sila 5 Keadilan Sosial.",
    badge: "IPTEK & Sila 5"
  },
  {
    id: 2,
    scenario: "Suatu daerah di Indonesia memiliki kekayaan alam tambang yang melimpah. Namun, pengelolaannya diserahkan sepenuhnya kepada pemilik modal tanpa perlindungan bagi pekerja lokal dan kelestarian lingkungan.",
    question: "Kondisi di atas menggambarkan tantangan kehidupan global yang perlu diwaspadai, yaitu...",
    options: [
      { id: "a", text: "Bonus Demografi" },
      { id: "b", text: "Kapitalisme murni yang mengabaikan keadilan sosial" },
      { id: "c", text: "Sishankamrata" },
      { id: "d", text: "Musyawarah Mufakat" }
    ],
    correctOptionId: "b",
    explanation: "Kapitalisme murni cenderung mengutamakan akumulasi modal dan keuntungan pihak swasta di atas kelestarian lingkungan dan keadilan sosial bagi rakyat.",
    badge: "Tantangan Global"
  },
  {
    id: 3,
    scenario: "Indonesia berada di antara Samudra Hindia dan Samudra Pasifik serta Benua Asia dan Australia, yang dilalui selat strategis lalu lintas kapal internasional.",
    question: "Dalam analisis SWOT bangsa Indonesia, faktor posisi di atas termasuk dalam...",
    options: [
      { id: "a", text: "Strength (Kekuatan) Posisi Geografis Strategis" },
      { id: "b", text: "Weakness (Kelemahan) Kualitas SDM" },
      { id: "c", text: "Threat (Tantangan) Individualisme" },
      { id: "d", text: "Opportunity (Peluang) Bonus Demografi" }
    ],
    correctOptionId: "a",
    explanation: "Posisi di antara dua benua dan dua samudra merupakan faktor internal fisik/geografis Indonesia yang menjadi Strength (Kekuatan) utama bangsa.",
    badge: "Analisis SWOT"
  },
  {
    id: 4,
    scenario: "Saat tim relawan Indonesia bertolak ke negara tetangga yang sedang dilanda gempa dahsyat untuk memberikan bantuan medis dan logistik tanpa membedakan latar belakang.",
    question: "Pengiriman relawan tersebut sesuai dengan pengamalan...",
    options: [
      { id: "a", text: "Sila ke-1: Ketuhanan Yang Maha Esa" },
      { id: "b", text: "Sila ke-2: Kemanusiaan yang Adil dan Beradab di tingkat global" },
      { id: "c", text: "Sila ke-4: Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan" },
      { id: "d", text: "Tantangan Kosmopolitanisme" }
    ],
    correctOptionId: "b",
    explanation: "Sila ke-2 menekankan rasa solidaritas kemanusiaan universal tanpa sekat bangsa, suku, maupun ras di ranah internasional.",
    badge: "Sila 2 Global"
  },
  {
    id: 5,
    scenario: "Seorang pemuda meremehkan bahasa Indonesia dan adat istiadat organisasinya karena menganggap budaya luar jauh lebih superior dalam segala hal.",
    question: "Sikap pemuda tersebut berisiko terjerat pengaruh negatif dari...",
    options: [
      { id: "a", text: "Bonus demografi yang produktif" },
      { id: "b", text: "Kosmopolitanisme dan inferioritas budaya yang mengikis rasa nasionalisme" },
      { id: "c", text: "Gotong royong dan Pancasila" },
      { id: "d", text: "Penguatan kemajemukan bangsa" }
    ],
    correctOptionId: "b",
    explanation: "Kosmopolitanisme yang tidak disaring dengan ketahanan ideologi Pancasila dapat membuat seseorang kehilangan rasa bangga terhadap bahasa dan kebudayaan bangsanya sendiri.",
    badge: "Filter Ideologi"
  }
];
