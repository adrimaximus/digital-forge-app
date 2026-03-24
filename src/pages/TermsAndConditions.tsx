
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Toaster } from '@/components/ui/toaster';
import BackToTop from '@/components/BackToTop';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <Card className="border border-white/10 bg-slate-900/50 backdrop-blur-sm mb-8">
          <CardContent className="p-6 md:p-10">
            <h1 className="text-3xl font-bold mb-8 text-yellow-400">Syarat & Ketentuan</h1>
            
            <div className="space-y-6 text-gray-300">
              <p>
                Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              
              <h2 className="text-xl font-semibold text-white mt-6">1. Penerimaan Ketentuan</h2>
              <p>
                Dengan mengakses dan menggunakan layanan Betterworks.id ("layanan"), Anda menyetujui untuk terikat oleh syarat dan ketentuan ini.
                Jika Anda tidak setuju dengan salah satu bagian dari ketentuan ini, Anda tidak diperkenankan untuk menggunakan layanan kami.
              </p>
              
              <h2 className="text-xl font-semibold text-white mt-6">2. Layanan yang Kami Sediakan</h2>
              <p>
                Betterworks.id menyediakan berbagai layanan digital, termasuk tapi tidak terbatas pada:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Pembuatan dan pengembangan website berbasis AI</li>
                <li>Sistem portal bisnis</li>
                <li>OmniChat</li>
                <li>Analisis SEO dan media sosial</li>
              </ul>
              <p>
                Kami berhak mengubah, menangguhkan, atau menghentikan sebagian atau seluruh layanan kami dengan atau tanpa pemberitahuan.
              </p>
              
              <h2 className="text-xl font-semibold text-white mt-6">3. Akun Pengguna dan Keamanan</h2>
              <p>
                Beberapa bagian dari layanan kami mungkin mengharuskan Anda untuk membuat akun. Anda bertanggung jawab untuk:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Menjaga kerahasiaan kredensial akun Anda</li>
                <li>Membatasi akses ke akun Anda</li>
                <li>Bertanggung jawab atas semua aktivitas yang terjadi pada akun Anda</li>
              </ul>
              <p>
                Kami berhak menonaktifkan akun jika kami mendeteksi aktivitas yang mencurigakan atau melanggar ketentuan penggunaan kami.
              </p>
              
              <h2 className="text-xl font-semibold text-white mt-6">4. Konten dan Hak Kekayaan Intelektual</h2>
              <p>
                Semua konten yang disediakan melalui layanan kami, termasuk teks, grafik, logo, ikon, gambar, audio, dan software, 
                dilindungi oleh hak cipta, merek dagang, dan hak kekayaan intelektual lainnya.
              </p>
              <p>
                Dengan menggunakan layanan kami dan mengunggah konten, Anda memberikan kami lisensi non-eksklusif, bebas royalti, 
                untuk menggunakan, mereproduksi, dan mendistribusikan konten tersebut dalam kaitannya dengan penyediaan layanan kami.
              </p>
              
              <h2 className="text-xl font-semibold text-white mt-6">5. Larangan Penggunaan</h2>
              <p>
                Anda dilarang menggunakan layanan kami untuk:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Melanggar hukum yang berlaku atau hak pihak ketiga</li>
                <li>Menyebarkan konten yang melanggar hukum, berbahaya, mengancam, atau melecehkan</li>
                <li>Mengirimkan virus, malware, atau kode berbahaya lainnya</li>
                <li>Mengumpulkan informasi tentang pengguna lain tanpa izin mereka</li>
                <li>Mengganggu atau merusak infrastruktur layanan kami</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-white mt-6">6. Pembayaran dan Pengembalian Dana</h2>
              <p>
                Untuk layanan berbayar, ketentuan berikut berlaku:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Pembayaran harus dilakukan sesuai dengan metode yang kami sediakan</li>
                <li>Harga dapat berubah dengan pemberitahuan yang wajar</li>
                <li>Pengembalian dana dapat diberikan dalam kondisi tertentu sesuai kebijakan kami</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-white mt-6">7. Batasan Tanggung Jawab</h2>
              <p>
                Layanan kami disediakan "sebagaimana adanya" dan "sebagaimana tersedia" tanpa jaminan apa pun, baik tersurat maupun tersirat.
                Kami tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari 
                penggunaan atau ketidakmampuan untuk menggunakan layanan kami.
              </p>
              
              <h2 className="text-xl font-semibold text-white mt-6">8. Ganti Rugi</h2>
              <p>
                Anda setuju untuk mengganti rugi dan membebaskan Betterworks.id, karyawan, dan afiliasinya dari klaim, kerugian, 
                biaya, dan pengeluaran (termasuk biaya hukum) yang timbul dari pelanggaran terhadap ketentuan ini atau penggunaan 
                layanan kami yang tidak sah.
              </p>
              
              <h2 className="text-xl font-semibold text-white mt-6">9. Perubahan Ketentuan</h2>
              <p>
                Kami berhak mengubah syarat dan ketentuan ini kapan saja. Perubahan akan berlaku setelah dipublikasikan di situs web kami.
                Penggunaan berkelanjutan atas layanan kami setelah perubahan tersebut merupakan persetujuan Anda terhadap ketentuan yang telah direvisi.
              </p>
              
              <h2 className="text-xl font-semibold text-white mt-6">10. Hukum yang Berlaku</h2>
              <p>
                Syarat dan ketentuan ini diatur oleh hukum Republik Indonesia, dan setiap perselisihan akan diselesaikan secara eksklusif di bawah 
                yurisdiksi pengadilan di Indonesia.
              </p>
              
              <h2 className="text-xl font-semibold text-white mt-6">11. Menghubungi Kami</h2>
              <p>
                Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan kami, silakan hubungi kami di:
              </p>
              <p className="mt-2">
                Email: hello@betterworks.id<br />
                Alamat: Jl. Siliwangi Q No.1, Depok, Jawa Barat 16431
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
      <BackToTop />
      <Toaster />
    </div>
  );
};

export default TermsAndConditions;
