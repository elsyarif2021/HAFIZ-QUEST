# Hafiz Quest

Game latihan tahfiz Juz 30 dalam bahasa Indonesia. Tersedia 37 surah, 564 ayat, sebelas mode latihan, duel dua pemain pada satu perangkat, mushaf, dan rapor evaluasi santri.

Dikembangkan oleh **Ustadz Liyas Syarifudin, S.Pd.I., M.Pd**

## Cocokkan Nama Surah

Pilih arti nama dari empat pilihan. Satu sesi mencakup seluruh 37 surah Juz 30 dalam urutan acak dan menghasilkan skor tersendiri. Daftar arti nama bersumber dari [EQuran](https://equran.id/api/v2/surat).

## Tebak Jumlah Ayat

Lihat nama surah dalam tulisan Arab dan Latin, lalu pilih jumlah ayatnya. Satu sesi mencakup 37 surah Juz 30 dengan skor tersendiri. Jumlah ayat memakai data yang sama dengan peta hafalan.

## Tebak Arti Ayat

Pilih terjemahan bahasa Indonesia dari empat pilihan. Setiap sesi memuat 10 soal acak dari 564 ayat Juz 30. Terjemahan berasal dari edisi [id.indonesian, Al Quran Cloud](https://api.alquran.cloud/v1/juz/30/id.indonesian).

## Pembuka

Ta’awudz dan basmalah diputar saat aplikasi dibuka apabila browser mengizinkan suara otomatis. Jika browser meminta interaksi, tekan **Mulai dengan Bacaan**. Teks disorot mengikuti bacaan. Tombol **Lewati** membuka dasbor langsung. Rekaman Mishary Alafasy diambil dari bagian pembuka [Al-Fatihah, QuranicAudio](https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/001.mp3).

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
