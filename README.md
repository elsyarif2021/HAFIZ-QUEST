# Hafiz Quest

Game latihan tahfiz Juz 30 dalam bahasa Indonesia, Inggris, dan Arab. Tersedia 37 surah, 564 ayat, sebelas mode latihan, duel dua pemain pada satu perangkat, mushaf, dan rapor evaluasi santri.

Dikembangkan oleh **Ustadz Liyas Syarifudin, S.Pd.I., M.Pd**

## Bahasa

Pilih **Indonesia**, **English**, atau **العربية** di layar pembuka atau dasbor. Pilihan tersimpan di browser dan tersedia sebagai tautan langsung melalui `?lang=id`, `?lang=en`, atau `?lang=ar`. Antarmuka Arab menggunakan tata letak kanan-ke-kiri. Narator mengikuti bahasa pilihan, sedangkan bacaan Al-Qur’an tetap berbahasa Arab.

## Cocokkan Nama Surah

Pilih arti nama dari empat pilihan. Satu sesi mencakup seluruh 37 surah Juz 30 dalam urutan acak dan menghasilkan skor tersendiri. Daftar arti nama bersumber dari [EQuran](https://equran.id/api/v2/surat).

## Tebak Jumlah Ayat

Lihat nama surah dalam tulisan Arab dan Latin, lalu pilih jumlah ayatnya. Satu sesi mencakup 37 surah Juz 30 dengan skor tersendiri. Jumlah ayat memakai data yang sama dengan peta hafalan.

## Tebak Arti Ayat

Pilih satu dari empat jawaban. Setiap sesi memuat 10 soal acak dari 564 ayat Juz 30. Sumber untuk tiap bahasa tersedia di Al Quran Cloud.

- Indonesia: [edisi id.indonesian](https://api.alquran.cloud/v1/juz/30/id.indonesian).
- Inggris: [Sahih International](https://api.alquran.cloud/v1/juz/30/en.sahih).
- Arab: [Tafsir Al-Muyassar](https://api.alquran.cloud/v1/juz/30/ar.muyassar).

## Murottal dan Murajaah Pintar

Mushaf menyediakan tombol murottal Mishary Alafasy untuk setiap ayat dan tombol untuk menandai ayat yang lupa. Murottal jawaban di puzzle, termasuk ujian dan kuis arti ayat, tersedia setelah jawaban benar. Dalam Duel, bacaan ayat pemantik tetap merupakan bagian dari soal. Audio untuk sebagian besar ayat membutuhkan internet.

Kesalahan latihan hafalan dan penanda di Mushaf masuk ke daftar Evaluasi yang sama. Satu sesi **Murajaah Pintar** berisi hingga lima ayat yang sudah waktunya diulang. Jawaban benar pada percobaan pertama, tanpa audio atau petunjuk, menjadwalkan pengulangan setelah 1, 3, lalu 7 hari. Kesalahan membuat ayat siap diulang kembali. Catatan tersimpan di browser dan diperbarui antartab pada situs yang sama.

## Pembuka

Ta’awudz dan basmalah diputar saat aplikasi dibuka apabila browser mengizinkan suara otomatis. Jika browser meminta interaksi, tekan **Mulai dengan Bacaan**. Teks disorot mengikuti bacaan. Tombol **Lewati** membuka dasbor langsung. Rekaman Mishary Alafasy diambil dari bagian pembuka [Al-Fatihah, QuranicAudio](https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/001.mp3).

## Instal di perangkat

Buka [Hafiz Quest](https://hafizquest.vercel.app/) dan pilih **Instal Aplikasi**. Chrome dan Edge dapat menampilkan dialog pemasangan. Di Safari iPhone/iPad, ketuk **Bagikan → Tambahkan ke Layar Utama**. Safari di Mac yang mendukung aplikasi web menyediakan **File → Tambahkan ke Dock**.

Setelah halaman dan cache selesai dimuat sekali, fitur inti dapat digunakan offline. Audio murottal dari CDN tetap memerlukan internet. Saat mengubah berkas yang di-cache atau versi URL aset, perbarui daftar dan nama cache pada `sw.js`.

## Menjalankan

Buka `index.html` di browser dari folder repositori agar berkas audio juga dapat dimuat. Untuk menguji melalui server lokal, jalankan `python3 -m http.server 8000` dari folder repositori lalu buka `http://localhost:8000`.

Teks, gaya, dan font sudah ada di dalam HTML. Musik dan klip narator disertakan di `assets/audio/`. Audio ayat pemantik Duel An-Nas disertakan bersama game. Tilawah untuk surah lain dimuat dari Islamic Network dan memerlukan koneksi internet.

Buka menu **♫** untuk mengatur musik dan narator secara terpisah. Musik dimatikan secara default dan dijeda saat narasi, tilawah, atau tampilan Mushaf aktif. Narator aktif secara default dan memberi komentar berbahasa Indonesia setelah jawaban diperiksa. Dalam Duel, bacaan ayat pemantik diputar saat ronde dimulai. Pemain dapat memutarnya ulang sebelum memilih ayat lanjutan.

## Hosting di Vercel

Impor repositori GitHub ini sebagai proyek baru di [Vercel](https://vercel.com/new). Pilih preset **Other**, pakai direktori akar repositori, lalu klik **Deploy**. Berkas `index.html` siap dilayani sebagai situs statis tanpa proses build atau variabel lingkungan.

## Penyimpanan data dan integrasi Supabase

Versi ini menyimpan data di `localStorage` per browser dan per alamat situs. Untuk integrasi berikutnya, gunakan kelompok data berikut sebagai titik awal.

| Data | Kunci lokal |
| --- | --- |
| Nama santri, kelas atau halaqah, pembimbing | `hq_profile` |
| XP dan daftar surah selesai | `hq_xp`, `hq_completed` |
| Jumlah percobaan, jawaban benar, catatan murajaah | `hq_attempts`, `hq_correct`, `hq_weak_verses` |
| Target dan klaim harian | `hq_daily` |

Saat menghubungkan [Supabase](https://supabase.com/), gunakan Auth dan kebijakan Row Level Security untuk membatasi akses data masing-masing santri. Data lokal lama perlu dimigrasikan secara eksplisit jika ingin tersedia lintas perangkat. Gunakan kunci publishable pada frontend dan simpan kunci service role di server.

## Sumber

- Teks Juz 30 edisi `quran-uthmani` dari [Al Quran Cloud](https://api.alquran.cloud/v1/juz/30/quran-uthmani).
- Audio Mishary Alafasy dari [Islamic Network](https://islamic.network/).
- Lisensi font yang disertakan dapat ditemukan di bagian akhir `index.html`.

- Musik latar berupa komposisi instrumental orisinal. Klip narasi dibuat dengan model [Piper Bahasa Indonesia](https://huggingface.co/rhasspy/piper-voices/tree/main/id/id_ID/news_tts/medium).
