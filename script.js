"use strict";
/* ===== Data dummy (ganti dengan API nanti) ===== */
const CATS = ["Atasan", "Bawahan", "Dress", "Hijab", "Aksesoris"];
const NAMES = {
  Atasan: ["Tunik Renda Laras", "Blus Kirana Lengan Balon", "Atasan Rajut Ayu", "Cardigan Rajut Wulan", "Atasan Plisket Rania", "Kemeja Linen Sekar", "Kemeja Oversize Dinda", "Blus Pita Sari"],
  Bawahan: ["Celana Lurus Kayla", "Rok Plisket Midi Nara", "Rok Span Satin Gendis", "Kulot Linen Asri", "Kulot Denim Lintang", "Celana Jogger Santai Puspa", "Rok A-Line Melati", "Kulot Plisket Anggun"],
  Dress: ["Dress Satin Ayudia", "Dress Kemeja Linen Sekar", "Gamis Kayana Floral", "Maxi Dress Ruffle Kinanti", "Midi Dress Larasati", "Dress Smock Citra", "Gamis Plisket Anindya", "Gamis Basic Harum"],
  Hijab: ["Pashmina Voal Sekar", "Pashmina Ceruti Asha", "Pashmina Plisket Alya", "Segi Empat Motif Ratri", "Hijab Instan Jersey Nayla", "Bergo Sport Ranti", "Segi Empat Premium Arunika", "Inner Ninja Rajut Sasi"],
  Aksesoris: ["Dompet Kulit Mini Amara", "Tas Bahu Rantai Kirana", "Tas Tote Anyam Sumi", "Scraft Satin Gendhis", "Kalung Tipis Lintang", "Tas Selempang", "Jepit Rambut Mutiara Ayu", "Anting Hoop Mini Sinta", "Bross Hijab Mutiara Dewi"]
};
const COLORS = [["Rose", "#C9748A"], ["Krem", "#E8D9C5"], ["Hitam", "#1F1B1D"], ["Sage", "#9CAF98"]];
const IMG = ["photo-1515886657613-9f3515b0c78f", "photo-1434389677669-e08b4cac3105", "photo-1496747611176-843222e1e57c", "photo-1483985988355-763728e1935b", "photo-1445205170230-053b83016050", "photo-1539109136881-3be0616acf4b", "photo-1469334031218-e382a71b716b"];
const img = (k, w = 600) => `https://images.unsplash.com/${IMG[k % IMG.length]}?auto=format&fit=crop&w=${w}&h=${Math.round(w * 4 / 3)}&q=75&fm=webp`;
/* Foto produk: nama produk -> nama file di folder image/ (tanpa .jpeg).
   Ganti foto: timpa file-nya, atau ubah nama file di daftar ini.
   Produk yang belum ada di daftar memakai foto cadangan dari Unsplash. */
const PHOTOS = {
  "Tunik Renda Laras": "blouse renda", "Blus Kirana Lengan Balon": "blouse lengan balon", "Atasan Rajut Ayu": "atasan rajut",
  "Cardigan Rajut Wulan": "cardigan rajut", "Atasan Plisket Rania": "blouse plisket", "Kemeja Linen Sekar": "kemeja linen",
  "Kemeja Oversize Dinda": "kemeja oversize", "Blus Pita Sari": "blouse pita",
  "Celana Lurus Kayla": "celana lurus", "Rok Plisket Midi Nara": "rok plisket", "Rok Span Satin Gendis": "rok span satin",
  "Kulot Linen Asri": "kulot linen", "Kulot Denim Lintang": "celana denim", "Celana Jogger Santai Puspa": "celana joger",
  "Rok A-Line Melati": "rok a line", "Kulot Plisket Anggun": "kulot plisket",
  "Dress Satin Ayudia": "dress satin", "Dress Kemeja Linen Sekar": "gamis linen", "Gamis Kayana Floral": "gamis floral",
  "Maxi Dress Ruffle Kinanti": "gamis ruffle", "Midi Dress Larasati": "midi dress", "Dress Smock Citra": "dress smock",
  "Gamis Plisket Anindya": "gamis plisket", "Gamis Basic Harum": "gamis basic",
  "Pashmina Voal Sekar": "pashmina voal", "Pashmina Ceruti Asha": "pashmina ceruti", "Pashmina Plisket Alya": "pashmina plisket",
  "Segi Empat Motif Ratri": "segiempat motif", "Hijab Instan Jersey Nayla": "hijab instan jersey", "Bergo Sport Ranti": "bergo sport",
  "Segi Empat Premium Arunika": "hijab segi empat", "Inner Ninja Rajut Sasi": "inner ninja rajut",
  "Dompet Kulit Mini Amara": "dompet kulit", "Scraft Satin Gendhis": "scraft satin", "Kalung Tipis Lintang": "kalung tipis lintang",
  "Jepit Rambut Mutiara Ayu": "jepit rambut mutiara", "Anting Hoop Mini Sinta": "anting", "Bross Hijab Mutiara Dewi": "bross",
  /* Tiga tas */
  "Tas Bahu Rantai Kirana": "Tas Bahu Rantai Kirana",
  "Tas Tote Anyam Sumi": "Tas Tote Anyam Sumi",
  "Tas Selempang": "Tas Selempang"
};
const pic = n => PHOTOS[n] ? "image/" + encodeURI(PHOTOS[n]) + ".jpeg" : "";
const SIZES = ["S", "M", "L", "XL"];
const mk = () => {
  let i = 0, out = [];
  CATS.forEach(cat => NAMES[cat].forEach(n => {
    i++;
    const price = (89 + (i * 37) % 160) * 1000, disc = i % 4 === 0;
    const colors = [0, 1, 2, 3].filter(c => (c + i) % 4 !== 3 || i % 2);
    const stock = {};
    colors.forEach(c => (cat === "Aksesoris" ? ["-"] : SIZES).forEach((s, si) => stock[c + "|" + s] = (i * 7 + c * 5 + si * 3) % 9 === 0 ? 0 : (i * 7 + c * 5 + si * 3) % 9 < 3 ? (i + c + si) % 3 + 1 : (i + si) % 7 + 4));
    out.push({ id: i, name: n, cat, price: disc ? Math.round(price * .8 / 1000) * 1000 : price, old: disc ? price : 0, isNew: i % 5 === 0, sold: (i * 53) % 200, colors, stock, imgs: [pic(n) || img(i)], fb: img(i), desc: "Bahan nyaman, jatuh rapi, dan mudah dipadukan untuk keseharian." });
  }));
  return out;
};
const VOUCHERS = { FARA10: { t: "pct", v: 10, d: "Diskon 10%" }, ONGKIR: { t: "ship", v: 0, d: "Gratis ongkir" }, HEMAT20: { t: "flat", v: 20000, d: "Potongan Rp20.000" } };
const STEPS = ["Dibayar", "Diproses", "Dikirim", "Selesai"];
const SEED_ORDERS = [
  { no: "FB-1001", status: "Dibayar", total: 289000, resi: "" }, { no: "FB-1002", status: "Diproses", total: 149000, resi: "" },
  { no: "FB-1003", status: "Dikirim", total: 412000, resi: "JNE0098123456" }, { no: "FB-1004", status: "Selesai", total: 199000, resi: "SPX55012233" },
  { no: "FB-1005", status: "Menunggu bayar", total: 175000, resi: "" }
];
/* Banner beranda. Tiap slide:
   kick = tulisan kecil di atas judul, t = judul, s = keterangan, cta = tulisan tombol, h = tujuan link
   src  = foto (file di folder image/), bg = warna latar slide
   wide: true  -> khusus foto LANDSCAPE: foto memenuhi seluruh banner, teks di atasnya (seperti contoh Magic Patterns)
   tanpa wide  -> foto tampil utuh di kanan, tidak dipotong/zoom
   k = foto cadangan Unsplash bila file src tidak ditemukan. Tambah/kurangi slide sesuka hati. */
const BANNERS = [
  { kick: "Koleksi Dress", t: "Lembut di Setiap Langkah", s: "Gamis, blus, dan pashmina bernuansa rose untuk hari-hari Kakak.", cta: "Belanja Dress", h: "#/katalog?cat=Dress", src: "image/banner-1.jpg", bg: "#F6E3E8", k: 2 },
  { kick: "Aksesoris", t: "Sentuhan Akhir yang Manis", s: "Kalung, gelang, dan tas pelengkap gaya Kakak sehari-hari.", cta: "Lihat Aksesoris", h: "#/katalog?cat=Aksesoris", src: "image/banner-2.jpg", bg: "#F1E6DD", k: 4 },
  { kick: "Atasan Terbaru", t: "Manis untuk Hari-hari Kakak", s: "Blus dan kemeja ringan yang nyaman dipadukan seharian.", cta: "Belanja Atasan", h: "#/katalog?cat=Atasan", src: "image/banner-3.jpg", bg: "#EFE4DC", k: 6 }
];
const FAQ = [["Apakah saya harus membuat akun untuk berbelanja?", "Tidak perlu, Kak. Anda bisa langsung checkout sebagai tamu. Cukup isi nama, nomor WhatsApp, dan alamat pengiriman."], ["Bagaimana cara melacak pesanan saya?", "Buka halaman Lacak Pesanan, lalu masukkan nomor pesanan (contoh: FRB-240812) yang kami kirimkan setelah pembayaran berhasil."], ["Dari mana pesanan dikirim dan berapa lama sampai?","Semua pesanan dikirim dari toko kami di Kota Madiun. Area Madiun Raya biasanya 1 hari, Jawa Timur 1-2 hari, dan luar Jawa 3-6 hari kerja."], ["Apakah ukuran bisa ditukar?", "Bisa, Kak. Penukaran ukuran gratis maksimal 7 hari setelah barang diterima, selama label masih terpasang dan barang belum dicuci."], ["Bagaimana jika barang yang saya terima cacat?", "Mohon maaf atas ketidaknyamanannya. Kirimkan video unboxing via WhatsApp, kami akan mengganti barang atau mengembalikan dana sepenuhnya."]];

/* ===== State + localStorage ===== */
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const rp = n => "Rp" + Math.round(n).toLocaleString("id-ID");
const load = (k, d) => { try { return JSON.parse(localStorage.getItem("fb_" + k)) ?? d } catch { return d } };
const save = (k, v) => { try { localStorage.setItem("fb_" + k, JSON.stringify(v)) } catch { } };
const P = mk(), byId = id => P.find(p => p.id == id);
let cart = load("cart", []), wish = load("wish", []), orders = load("orders", SEED_ORDERS), voucher = load("voucher", null);
const lastStock = (p, c, s) => p.stock[c + "|" + (p.cat === "Aksesoris" ? "-" : s)] ?? 0;
const inCart = (id, c, s) => cart.filter(x => x.id == id && x.c == c && x.s == s).reduce((a, x) => a + x.q, 0);
const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;

/* ===== Util UI ===== */
function toast(m) { const e = document.createElement("div"); e.className = "toast"; e.textContent = m; $("#toasts").append(e); setTimeout(() => e.remove(), 2900); }
function countUp(el, to) {
  const from = +el.dataset.v || 0; el.dataset.v = to; if (reduce) return el.textContent = rp(to);
  const t0 = performance.now(); (function f(t) { const k = Math.min(1, (t - t0) / 500); el.textContent = rp(from + (to - from) * k); if (k < 1) requestAnimationFrame(f) })(t0);
}
function reveal() {
  $$(".rv:not(.in)").forEach((e, i) => { e.style.transitionDelay = (i % 8) * 60 + "ms" });
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target) } }), { threshold: .1 });
  $$(".rv:not(.in)").forEach(e => io.observe(e));
}
function modal(html) { const m = $("#modal"); m.innerHTML = `<div role="dialog" aria-modal="true">${html}</div>`; m.hidden = false; m.onclick = e => { if (e.target === m || e.target.dataset.close != null) m.hidden = true } }
function updateBadges() {
  const n = cart.reduce((a, x) => a + x.q, 0), b = $("#cartCount"); if (b.textContent != n) { b.textContent = n; b.animate([{ transform: "scale(1.5)" }, { transform: "none" }], 300) }
  $("#wishCount").textContent = wish.length; save("cart", cart); save("wish", wish);
}
const subtotal = () => cart.reduce((a, x) => a + byId(x.id).price * x.q, 0);
const discount = ship => { const v = VOUCHERS[voucher]; if (!v) return 0; const s = subtotal(); return v.t === "pct" ? s * v.v / 100 : v.t === "flat" ? Math.min(v.v, s) : (ship || 0) };

/* ===== Komponen ===== */
function card(p, i = 0) {
  const total = Object.values(p.stock).reduce((a, b) => a + b, 0), lowStock = total > 0 && total <= 12;
  return `<a class="card" href="#/produk/${p.id}" style="animation-delay:${i * 40}ms">
  <div class="ph"><div class="tag">${p.isNew ? "<b>Baru</b>" : ""}${p.old ? "<b class='d'>Diskon</b>" : ""}${lowStock ? "<b>Stok menipis</b>" : ""}${total === 0 ? "<b>Habis</b>" : ""}</div>
  <button class="wish ${wish.includes(p.id) ? "on" : ""}" data-w="${p.id}" aria-label="Simpan ke wishlist">${wish.includes(p.id) ? "♥" : "♡"}</button>
<img src="${p.imgs[0]}" onerror="this.onerror=null;this.src='${p.fb}'" alt="${p.name} Farabelle" loading="lazy" width="600" height="800">
</div>
  <p class="nm">${p.name}</p><p class="price">${rp(p.price)}${p.old ? `<s>${rp(p.old)}</s>` : ""}</p></a>`;
}
function renderTabs(active) {
  const t = [["Baru", "#/katalog?new=1"], ...CATS.map(c => [c, "#/katalog?cat=" + c]), ["Sale", "#/katalog?sale=1"], ["FAQ", "#/bantuan"]];
  $("#tabs").innerHTML = t.map(([n, h]) => `<a href="${h}" class="${active === h ? "on" : ""}">${n}</a>`).join("");
}
function banners() { return load("banners", BANNERS) }

/* ===== Halaman ===== */
const routes = {
  home() {
    const b = banners();
    return `<div class="hero" id="hero">${b.map((x, i) => `<a class="slide ${i ? "" : "on"}${x.wide ? " wide" : ""}" href="${x.h}"${x.bg ? ` style="--bg:${x.bg}"` : ""}><img src="${x.src ? encodeURI(x.src) : img(x.k, 1200)}" style="object-position:${x.pos || 'center'}" onerror="this.onerror=null;this.src='${img(x.k, 1200)}'" alt="" ${i ? 'loading="lazy"' : ""}><div class="tx">${x.kick ? `<span class="kick">${x.kick}</span>` : ""}<h1>${x.t}</h1><p>${x.s}</p><span class="btn">${x.cta || "Belanja sekarang"}</span></div></a>`).join("")}
    <div class="dots">${b.map((_, i) => `<i data-i="${i}" class="${i ? "" : "on"}"><b></b></i>`).join("")}</div><button class="hn p" aria-label="Sebelumnya">‹</button><button class="hn n" aria-label="Berikutnya">›</button></div>
    <div class="benefits">${["Belanja 24 jam", "Ongkir otomatis", "Bayar QRIS/VA/e-wallet", "Lacak pesanan"].map(x => `<div class="rv">${x}</div>`).join("")}</div>
    <section><h2 class="rv">Belanja per kategori</h2><div class="cats">${CATS.map((c, i) => { const f = P.find(p => p.cat === c) || P[0]; return `<a class="cat rv" href="#/katalog?cat=${c}"><img src="${f.imgs[0]}" onerror="this.onerror=null;this.src='${f.fb}'" alt="Kategori ${c} - ${f.name}" loading="lazy"><span>${c}</span></a>` }).join("")}</div></section>
    <section><h2 class="rv">Koleksi terbaru</h2><div class="railwrap"><button class="arrow l" data-rail="-1" aria-label="Geser kiri">‹</button><div class="rail" id="rail">${P.filter(p => p.isNew || p.id > 32).map(p => card(p)).join("")}</div><button class="arrow r" data-rail="1" aria-label="Geser kanan">›</button></div></section>
    <section><h2 class="rv">Produk terlaris</h2><div class="grid">${[...P].sort((a, b) => b.sold - a.sold).slice(0, 8).map(p => `<div class="rv">${card(p)}</div>`).join("")}</div></section>
    <section class="promo rv"><h2>Voucher FARA10</h2><p>Diskon 10% untuk pembelian pertama Anda. Masukkan kode di keranjang.</p><br><a class="btn" href="#/katalog?sale=1">Lihat produk diskon</a></section>
    <section><h2 class="rv">Kunjungi toko kami</h2><div class="trust"><div class="rv"><h3>Toko Madiun</h3><p>Jl. Ring Road Barat, Kelurahan Winongo, Kecamatan Manguharjo, Kota Madiun, Jawa Timur.<br>Buka setiap hari 09.00–20.00.</p></div><div class="rv"><h3>Retur 7 hari</h3><p>Ukuran kurang pas? Tukar atau kembalikan dalam 7 hari.</p></div><div class="rv"><h3>Ikuti kami</h3><p><a href="https://www.instagram.com/farabelle.store" target="_blank" rel="noopener" aria-label="Instagram Farabelle (@farabelle.store)">Instagram</a> · <a href="https://www.tiktok.com/@farabelle.store" target="_blank" rel="noopener" aria-label="TikTok Farabelle (@farabelle.store)">TikTok</a></p></div></div></section>`;
  },
  katalog(q) {
    const f = { cat: q.get("cat") || "", size: q.get("size") || "", max: +q.get("max") || 0, sort: q.get("sort") || "new", sale: q.get("sale"), new: q.get("new"), s: q.get("s") || "", n: +q.get("n") || 12 };
    const set = (k, v) => { const u = new URLSearchParams(location.hash.split("?")[1] || ""); v ? u.set(k, v) : u.delete(k); if (k !== "n") u.delete("n"); location.replace("#/katalog?" + u) };
    window.__set = set;
    let l = P.filter(p => (!f.cat || p.cat === f.cat) && (!f.max || p.price <= f.max) && (!f.sale || p.old) && (!f.new || p.isNew) && (!f.size || f.cat === "Aksesoris" || p.colors.some(c => lastStock(p, c, f.size) > 0)) && (!f.s || (p.name + p.cat).toLowerCase().includes(f.s.toLowerCase())));
    const so = { new: (a, b) => b.id - a.id, hot: (a, b) => b.sold - a.sold, lo: (a, b) => a.price - b.price, hi: (a, b) => b.price - a.price }; l.sort(so[f.sort]);
    const chip = (k, t) => `<button class="chip on" onclick="__set('${k}','')">${t} ✕</button>`;
    const act = [f.cat && chip("cat", f.cat), f.size && f.cat !== "Aksesoris" && chip("size", "Ukuran " + f.size), f.max && chip("max", "≤ " + rp(f.max)), f.sale && chip("sale", "Diskon"), f.new && chip("new", "Baru"), f.s && chip("s", "“" + f.s + "”")].filter(Boolean).join("");
    const filt = `<h3>Kategori</h3><div class="opts">${CATS.map(c => `<button class="chip ${f.cat === c ? "on" : ""}" onclick="__set('cat','${f.cat === c ? "" : c}')">${c}</button>`).join("")}</div>
    ${f.cat === "Aksesoris" ? "" : `<h3>Ukuran</h3><div class="opts">${SIZES.map(s => `<button class="chip ${f.size === s ? "on" : ""}" onclick="__set('size','${f.size === s ? "" : s}')">${s}</button>`).join("")}</div>`}
    <h3>Harga maksimum</h3><select onchange="__set('max',this.value)" aria-label="Harga maksimum"><option value="">Semua</option>${[100000, 150000, 200000, 250000].map(v => `<option value="${v}" ${f.max === v ? "selected" : ""}>${rp(v)}</option>`).join("")}</select>
    <h3>Label</h3><div class="opts"><button class="chip ${f.sale ? "on" : ""}" onclick="__set('sale','${f.sale ? "" : 1}')">Diskon</button><button class="chip ${f.new ? "on" : ""}" onclick="__set('new','${f.new ? "" : 1}')">Baru</button></div>`;
    window.__filt = () => modal(`<h2>Filter</h2>${filt}<br><button class="btn" data-close style="width:100%">Lihat ${l.length} produk</button>`);
    return `<div class="cathead"><h1>${f.cat || (f.sale ? "Sale" : f.new ? "Baru" : "Semua produk")} <small style="font:14px Inter;color:var(--ink-s)">${l.length} produk</small></h1>
    <div style="display:flex;gap:8px"><button class="btn ghost sm" onclick="__filt()">Filter</button><select style="min-height:36px;width:auto" onchange="__set('sort',this.value)" aria-label="Urutkan">${[["new", "Terbaru"], ["hot", "Terlaris"], ["lo", "Harga terendah"], ["hi", "Harga tertinggi"]].map(([v, t]) => `<option value="${v}" ${f.sort === v ? "selected" : ""}>${t}</option>`).join("")}</select></div></div>
    <div class="chips">${act}</div><div class="layout"><aside class="side">${filt}</aside><div><div class="grid" id="results">${Array(6).fill('<div class="skel"></div>').join("")}</div>
    ${l.length > f.n ? `<p style="text-align:center;margin-top:24px"><button class="btn ghost" onclick="__set('n',${f.n + 12})">Muat lebih banyak</button></p>` : ""}</div></div>` + `<template id="rt">${l.length ? l.slice(0, f.n).map((p, i) => card(p, i % 12)).join("") : `<div class="empty" style="grid-column:1/-1"><h2>Belum ada yang cocok</h2><p>Coba hapus beberapa filter, atau lihat ${CATS.slice(0, 3).map(c => `<a href="#/katalog?cat=${c}" style="color:var(--rose-d)">${c}</a>`).join(", ")}.</p></div>`}</template>`;
  },
  produk(id) {
    const p = byId(id); if (!p) return `<div class="empty"><h2>Produk tidak ditemukan</h2><a class="btn" href="#/katalog">Kembali belanja</a></div>`;
    document.title = p.name + " – Farabelle";
    const ld = { "@context": "https://schema.org", "@type": "Product", name: p.name, image: p.imgs, offers: { "@type": "Offer", priceCurrency: "IDR", price: p.price } };
    window.sel = { c: p.colors[0], s: p.cat === "Aksesoris" ? "-" : "" };
    return `<script type="application/ld+json">${JSON.stringify(ld)}<\/script><div class="pd"><div class="gal"><div class="main" id="gm"><img id="gi" src="${p.imgs[0]}" onerror="this.onerror=null;this.src='${p.fb}'" alt="${p.name}"></div>${p.imgs.length > 1 ? `<div class="thumbs">${p.imgs.map((s, i) => `<img src="${s}" alt="Foto ${i + 1} ${p.name}" class="${i ? "" : "on"}" data-g="${i}">`).join("")}</div>` : ""}</div>
    <div><h1>${p.name}</h1><p class="price" style="font-size:20px;margin:6px 0">${rp(p.price)}${p.old ? `<s>${rp(p.old)}</s>` : ""}</p><p style="color:var(--ink-s)">${p.desc}</p>
    <h3 style="margin-top:16px;font-size:16px">Warna: <span id="cn">${COLORS[p.colors[0]][0]}</span></h3><div class="opts" id="co">${p.colors.map((c, i) => `<button class="sw ${i ? "" : "on"}" data-c="${c}" style="background:${COLORS[c][1]}" aria-label="${COLORS[c][0]}"></button>`).join("")}</div>
    ${p.cat === "Aksesoris" ? "" : `<h3 style="font-size:16px">Ukuran <button class="chip" id="guide">Panduan ukuran</button></h3><div class="opts" id="so"></div>`}<p id="sk" aria-live="polite" style="min-height:24px"></p>
    <div class="box"><b>Estimasi ongkir</b><input class="field" id="kota" placeholder="Ketik kota/kecamatan" style="margin-top:8px"><p id="est"></p></div>
    <div class="sticky"><button class="btn" id="add">Tambah ke keranjang</button><a class="btn ghost" target="_blank" rel="noopener" href="https://wa.me/6281234567890?text=${encodeURIComponent("Halo Farabelle, saya tertarik dengan " + p.name)}">WhatsApp</a></div></div></div>
    <section><h2 class="rv">Produk terkait</h2><div class="grid">${P.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 4).map(x => `<div class="rv">${card(x)}</div>`).join("")}</div></section>`;
  },
  lacak(q) {
    const no = (q.get("no") || "").toUpperCase(), o = orders.find(x => x.no === no);
    const idx = o ? STEPS.indexOf(o.status) : -1;
    return `<div style="max-width:560px;margin:24px auto"><h1>Lacak pesanan</h1><form onsubmit="event.preventDefault();location.hash='#/lacak?no='+this.no.value.trim()" style="display:flex;gap:8px;margin:14px 0"><input class="field" name="no" value="${no}" placeholder="Contoh: FB-1003" aria-label="Nomor pesanan"><button class="btn">Cek</button></form>
    ${no && !o ? `<p class="empty">Nomor pesanan tidak ditemukan. Periksa lagi atau hubungi kami lewat WhatsApp.</p>` : ""}
    ${o ? `<div class="box"><b>${o.no}</b> · ${o.status} · ${rp(o.total)}${o.resi ? `<p>Resi: <b>${o.resi}</b> <button class="chip" onclick="navigator.clipboard?.writeText('${o.resi}');toast('Nomor resi disalin')">Salin</button></p>` : ""}
    <ul class="tl">${STEPS.map((s, i) => `<li class="${i <= idx ? "done" : ""}" style="--i:${i}">${s}</li>`).join("")}</ul>${idx < 0 ? '<p>Menunggu pembayaran.</p>' : ""}</div>` : `<p style="color:var(--ink-s)">Contoh nomor: FB-1001 sampai FB-1005.</p>`}</div>`;
  },
  bantuan() {
    return `<div style="max-width:680px;margin:24px auto"><h1>Bantuan</h1><div style="margin:14px 0">${FAQ.map(([q, a]) => `<details><summary>${q}</summary><p style="margin-top:8px;color:var(--ink-s)">${a}</p></details>`).join("")}</div>
    <h2>Kebijakan retur</h2><p>Barang dapat dikembalikan dalam 7 hari setelah diterima, dalam kondisi baru dengan label terpasang. Hubungi kami lewat WhatsApp untuk memulai retur.</p>
    <h2 style="margin-top:28px">Tentang Farabelle</h2><h3>Dirajut dari Madiun, untuk perempuan Indonesia</h3><p>Farabelle bermula dari sebuah toko kecil di Madiun pada 2019. Kami memilih bahan yang adem untuk iklim tropis, potongan yang sopan namun tetap manis, dan harga yang bersahabat. Setiap pesanan masih kami kemas sendiri di toko dengan catatan kecil berisi ucapan terima kasih untuk Kakak.</p><p>Toko fashion wanita di Jl. Ring Road Barat, Kelurahan Winongo, Kecamatan Manguharjo, Kota Madiun, Jawa Timur. Buka setiap hari 09.00–20.00.</p>
    <h2 style="margin-top:28px">Kebijakan privasi</h2><p>Data keranjang dan pesanan hanya disimpan di perangkat Anda pada prototipe ini.</p>
    <p style="margin-top:28px"><span class="soon">Segera hadir</span> Akun, wishlist lengkap, voucher, dan ulasan berfoto.</p></div>`;
  },
  tentang() {
    const alamat = "Jl. Ring Road Barat, Kelurahan Winongo, Kecamatan Manguharjo, Kota Madiun, Jawa Timur 63162";
    const ic = {
      pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
      clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
      ret: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 3-6.2"/><path d="M4 4v4h4"/></svg>'
    };
    return `<section class="about">
      <div class="about-top">
        <div class="about-photo"><img src="image/toko.jpeg" alt="Toko Farabelle di Madiun" onerror="this.onerror=null;this.parentNode.classList.add('nophoto');this.remove()"></div>
        <div class="about-info">
          <h1>Toko kami ada di Madiun, silakan mampir</h1>
          <p class="lead">Setiap pesanan kami siapkan sendiri dari toko, dicek satu per satu sebelum dikirim. Kakak juga boleh datang langsung untuk mencoba ukuran.</p>
          <ul class="about-list">
            <li>${ic.pin}<div><b>Alamat</b><span>${alamat}</span></div></li>
            <li>${ic.clock}<div><b>Jam buka</b><span>Senin – Jumat: 09.00 – 20.00 WIB<br>Sabtu – Minggu: 09.00 – 21.00 WIB</span></div></li>
            <li>${ic.ret}<div><b>Retur mudah</b><span>Tukar ukuran gratis 7 hari. <a href="#/bantuan">Baca kebijakan</a></span></div></li>
          </ul>
        </div>
      </div>
      <div class="about-story">
        <h2>Dirajut dari Madiun, untuk perempuan Indonesia</h2>
        <p>Farabelle bermula dari sebuah toko kecil di Madiun pada 2019. Kami memilih bahan yang adem untuk iklim tropis, potongan yang sopan namun tetap manis, dan harga yang bersahabat. Setiap pesanan masih kami kemas sendiri di toko dengan catatan kecil berisi ucapan terima kasih untuk Kakak.</p>
      </div>
      <div class="about-map">
        <h2>Lokasi toko</h2>
        <div class="map-wrap"><iframe title="Peta lokasi Farabelle di Madiun" src="https://www.google.com/maps?q=${encodeURIComponent(alamat)}&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>
        <a class="btn" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(alamat)}" target="_blank" rel="noopener">Buka di Google Maps</a>
      </div>
    </section>`;
  },
  checkout() {
    if (!cart.length) return `<div class="empty"><h2>Keranjang masih kosong</h2><a class="btn" href="#/katalog">Mulai belanja</a></div>`;
    return `<h1 style="margin-top:20px">Checkout</h1><div class="steps" id="steps">${[0, 1, 2, 3].map(() => "<i><b></b></i>").join("")}</div><div class="co"><div id="stepbox"></div><div class="box" id="sum" style="align-self:start"></div></div>`;
  },
  bayar(id) {
    const o = orders.find(x => x.no === id); if (!o) return `<div class="empty"><h2>Pesanan tidak ditemukan</h2></div>`;
    if (o.status !== "Menunggu bayar") return `<div class="ok"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40"/><path d="M30 52l14 14 27-30"/></svg><h2>Pembayaran berhasil</h2><p>Nomor pesanan <b>${o.no}</b>. Terima kasih sudah berbelanja!</p><br><a class="btn" href="#/lacak?no=${o.no}">Lacak pesanan</a></div>`;
    return `<div style="max-width:440px;margin:24px auto;text-align:center"><h1>Selesaikan pembayaran</h1><p>${o.pay} · ${rp(o.total)}</p><div class="box" style="margin:16px 0">${o.pay === "QRIS" ? `<img src="image/qris.jpeg" alt="Kode QRIS Farabelle" style="display:block;width:100%;max-width:280px;margin:0 auto 10px;border-radius:12px" onerror="this.outerHTML='<div style=&quot;font-size:90px&quot;>▦</div>'"><p>Pindai kode QRIS (simulasi)</p>` : `<p>Nomor virtual account</p><h2>8077 ${o.no.replace(/\D/g, "")} 0012</h2>`}<p>Bayar dalam <b id="cd">15:00</b></p></div>
    <button class="btn" id="paid" style="width:100%">Simulasikan pembayaran berhasil</button></div>`;
  }
};

/* ===== Router ===== */
function render() {
  const [path, qs] = location.hash.slice(1).split("?"); const q = new URLSearchParams(qs || ""), seg = (path || "/").split("/").filter(Boolean);
  const name = seg[0] || "home"; const fn = routes[name] || routes.home; document.title = "Farabelle – Fashion Wanita Madiun";
  const app = $("#app"); let html; try { html = fn(name === "katalog" || name === "lacak" ? q : seg[1]) } catch (err) { console.error(err); html = `<div style="padding:24px;color:#A8566B"><h2>Terjadi error di script.js</h2><pre style="white-space:pre-wrap">${String(err && err.stack || err)}</pre></div>` } app.innerHTML = `<div class="page">${html}</div>`;
  renderTabs(location.hash.split("&")[0]); window.scrollTo({ top: 0, behavior: "instant" });
  ({ home: initHome, katalog: initKatalog, produk: initProduk, checkout: initCheckout, bayar: initPay, lacak: () => { } }[name] || (() => { }))(seg[1]);
  reveal(); bindWish();
}
// LOADING KUPU-KUPU SAAT PINDAH MENU
function showButterflyLoader() {
  const loader = document.getElementById("butterfly-loader");
  if (!loader) return;
  loader.classList.add("show");
  clearTimeout(window.butterflyTimer);
  window.butterflyTimer = setTimeout(() => {
    loader.classList.remove("show");
  }, 800);
}
addEventListener("hashchange", () => {
  showButterflyLoader();
  render();
});
function bindWish() {
  $$("[data-w]").forEach(b => b.onclick = e => {
    e.preventDefault(); const id = +b.dataset.w; wish = wish.includes(id) ? wish.filter(x => x !== id) : [...wish, id];
    b.classList.toggle("on"); b.textContent = wish.includes(id) ? "♥" : "♡"; updateBadges(); toast(wish.includes(id) ? "Disimpan ke wishlist" : "Dihapus dari wishlist");
  });
}
let heroT;
function initHome() {
  const s = $$(".slide"), d = $$(".dots i"); let i = 0; clearInterval(heroT);
  const go = n => { i = (n + s.length) % s.length; s.forEach((x, k) => x.classList.toggle("on", k === i)); d.forEach((x, k) => { x.classList.remove("on"); if (k === i) { void x.offsetWidth; x.classList.add("on") } }) };
   const play = () => { clearInterval(heroT); if (s.length > 1 && !reduce) heroT = setInterval(() => { if (!$("#hero")) return clearInterval(heroT); go(i + 1) }, 5000) };
  d.forEach(x => x.onclick = () => { go(+x.dataset.i); play() }); play();
  $(".hn.p").onclick = () => { go(i - 1); play() }; $(".hn.n").onclick = () => { go(i + 1); play() };
  let x0 = 0; const h = $("#hero"); h.ontouchstart = e => x0 = e.touches[0].clientX; h.ontouchend = e => { const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) { go(i + (dx < 0 ? 1 : -1)); play() } };
  $$("[data-rail]").forEach(b => b.onclick = () => $("#rail").scrollBy({ left: b.dataset.rail * $("#rail").clientWidth * .8, behavior: "smooth" }));
}
function initKatalog() { setTimeout(() => { const r = $("#results"), t = $("#rt"); if (r && t) r.innerHTML = t.innerHTML; bindWish() }, 300) }
function initProduk(id) {
  const p = byId(id); if (!p) return; const sel = window.sel;
  const paint = () => {
    const soEl = $("#so"); if (soEl) soEl.innerHTML = SIZES.map(s => { const st = lastStock(p, sel.c, s); return `<button class="sz ${sel.s === s ? "on" : ""}" data-s="${s}" ${st ? "" : "disabled"} aria-label="Ukuran ${s}${st ? "" : ", habis"}">${s}</button>` }).join("");
    const st = sel.s ? lastStock(p, sel.c, sel.s) : 0; $("#sk").innerHTML = sel.s ? (st <= 3 ? `<span class="low">Stok menipis: sisa ${st}</span>` : `Stok tersedia: ${st}`) : "Pilih ukuran terlebih dahulu.";
    $$(".sz").forEach(b => b.onclick = () => { sel.s = b.dataset.s; paint() });
  };
  paint();
  $$("[data-c]").forEach(b => b.onclick = () => { sel.c = +b.dataset.c; sel.s = p.cat === "Aksesoris" ? "-" : ""; $$("[data-c]").forEach(x => x.classList.toggle("on", x === b)); $("#cn").textContent = COLORS[sel.c][0]; paint() });
  $$("[data-g]").forEach(t => t.onclick = () => { const gi = $("#gi"); gi.style.opacity = 0; setTimeout(() => { gi.src = p.imgs[t.dataset.g]; gi.style.opacity = 1 }, 150); $$("[data-g]").forEach(x => x.classList.toggle("on", x === t)) });
  $("#gi").style.transition = "opacity .2s,transform .4s"; $("#gm").onclick = () => $("#gm").classList.toggle("z");
  if ($("#guide")) $("#guide").onclick = () => modal(`<h2>Panduan ukuran</h2><table><tr><th>Ukuran</th><th>Lingkar dada</th><th>Panjang</th></tr><tr><td>S</td><td>84 cm</td><td>60 cm</td></tr><tr><td>M</td><td>88 cm</td><td>62 cm</td></tr><tr><td>L</td><td>94 cm</td><td>64 cm</td></tr><tr><td>XL</td><td>100 cm</td><td>66 cm</td></tr></table><br><button class="btn" data-close>Tutup</button>`);
  $("#kota").oninput = e => { const v = e.target.value.trim(); $("#est").innerHTML = v.length > 2 ? `Estimasi ke ${v}: ${rp(9000 + v.length * 1000)}, tiba 2–4 hari.` : "" }; /* TODO(API): Biteship/RajaOngkir */
  $("#add").onclick = e => {
    if (!sel.s) { $("#so").animate([{ transform: "translateX(-6px)" }, { transform: "translateX(6px)" }, { transform: "none" }], 300); return toast("Pilih ukuran dulu ya") }
    if (inCart(p.id, sel.c, sel.s) >= lastStock(p, sel.c, sel.s)) return toast("Stok varian ini sudah penuh di keranjang");
    addCart(p.id, sel.c, sel.s); fly($("#gi"));
  };
}
function addCart(id, c, s) { const x = cart.find(i => i.id == id && i.c == c && i.s == s); x ? x.q++ : cart.push({ id, c, s, q: 1 }); updateBadges(); toast("Masuk ke keranjang") }
function fly(src) {
  const a = src.getBoundingClientRect(), b = $("#cartBtn").getBoundingClientRect(), f = document.createElement("img"); f.src = src.src; f.className = "fly";
  f.style.left = a.left + a.width / 2 - 35 + "px"; f.style.top = a.top + a.height / 2 - 47 + "px"; document.body.append(f);
  const dx = b.left - a.left - a.width / 2 + 10, dy = b.top - a.top - a.height / 2 + 10;
  f.animate([{ transform: "none", opacity: 1 }, { transform: `translate(${dx}px,${dy}px) scale(.2)`, opacity: .3 }], { duration: reduce ? 1 : 700, easing: "ease-in" }).onfinish = () => { f.remove(); $("#cartBtn").classList.remove("shake"); void $("#cartBtn").offsetWidth; $("#cartBtn").classList.add("shake") };
}

/* ===== Mini-cart ===== */
function drawer(open) {
  const d = $("#drawer"); if (open) paintCart(); d.classList.toggle("on", open); $("#backdrop").classList.toggle("on", open); d.setAttribute("aria-hidden", !open);
}
function paintCart() {
  $("#drawer").innerHTML = `<div class="dh"><h2 style="margin:0">Keranjang</h2><button class="ibtn" data-x aria-label="Tutup keranjang">✕</button></div>
  <div class="dl">${cart.length ? cart.map((x, i) => { const p = byId(x.id); return `<div class="ci"><img src="${p.imgs[0]}" onerror="this.onerror=null;this.src='${p.fb}'" alt="${p.name}"><div><b>${p.name}</b><p style="font-size:13px;color:var(--ink-s)">${COLORS[x.c][0]}${p.cat === "Aksesoris" ? "" : " · " + x.s}</p><div class="qty"><button data-q="${i}" data-d="-1" aria-label="Kurangi">−</button><span>${x.q}</span><button data-q="${i}" data-d="1" aria-label="Tambah">+</button></div></div><div style="text-align:right"><p class="price">${rp(p.price * x.q)}</p><button class="chip" data-r="${i}">Hapus</button></div></div>` }).join("") : `<div class="empty"><p>Keranjang masih kosong. Yuk, pilih yang Anda suka.</p></div>`}</div>
  <div class="df"><div style="display:flex;gap:8px;margin-bottom:10px"><input class="field" id="vc" placeholder="Kode voucher" value="${voucher || ""}" aria-label="Kode voucher"><button class="btn ghost" id="vb">Pakai</button></div>
  <div class="row"><span>Subtotal</span><b data-v="0" id="st"></b></div>${voucher ? `<div class="row"><span>${VOUCHERS[voucher].d}</span><span>−${rp(discount(0))}</span></div>` : ""}<a class="btn" href="#/checkout" style="width:100%;margin-top:8px" ${cart.length ? "" : "disabled"}>Lanjut ke checkout</a></div>`;
  countUp($("#st"), subtotal() - (VOUCHERS[voucher]?.t === "ship" ? 0 : discount(0)));
}
$("#drawer").addEventListener("click", e => {
  const t = e.target;
  if (t.dataset.x != null) return drawer(false);
  if (t.dataset.q != null) { const x = cart[t.dataset.q], d = +t.dataset.d; if (d > 0 && x.q >= lastStock(byId(x.id), x.c, x.s)) return toast("Stok tidak mencukupi"); x.q += d; if (x.q < 1) x.q = 1; updateBadges(); paintCart() }
  if (t.dataset.r != null) { const row = t.closest(".ci"); row.classList.add("out"); setTimeout(() => { cart.splice(t.dataset.r, 1); updateBadges(); paintCart() }, reduce ? 0 : 320) }
  if (t.id === "vb") { const c = $("#vc").value.trim().toUpperCase(); if (VOUCHERS[c]) { voucher = c; save("voucher", c); toast("Voucher dipakai: " + VOUCHERS[c].d) } else { voucher = null; save("voucher", null); toast("Kode voucher tidak dikenali") } paintCart() }
  if (t.closest("a.btn")) drawer(false);
});
$("#cartBtn").onclick = () => drawer(true); $("#backdrop").onclick = () => drawer(false);
$("#wishBtn").onclick = () => { location.hash = "#/katalog?s="; toast(wish.length ? `${wish.length} produk di wishlist (halaman wishlist segera hadir)` : "Wishlist segera hadir") };
addEventListener("keydown", e => { if (e.key === "Escape") { drawer(false); $("#modal").hidden = true } });

/* ===== Checkout ===== */
let co;
function initCheckout() {
  if (!cart.length) return; co = { step: 0, dir: 1, d: { nama: "", hp: "", email: "", alamat: "", kota: "", kurir: null, pay: "QRIS" } }; stepPaint(false);
}
const COURIERS = [["JNE Reguler", 1, "2–3 hari"], ["J&T Express", .9, "2–4 hari"], ["SiCepat Halu", .8, "3–5 hari"]];
const shipCost = () => co.d.kurir == null ? 0 : Math.round((9000 + co.d.kota.length * 800) * COURIERS[co.d.kurir][1] / 500) * 500;
function stepPaint(anim = true) {
  const d = co.d, box = $("#stepbox"); $$("#steps i").forEach((x, i) => x.classList.toggle("on", i <= co.step));
  const f = (id, label, ph, t = "text") => `<label>${label}<input class="field" id="${id}" type="${t}" value="${d[id] ?? ""}" placeholder="${ph}"></label>`;
  const html = [
    `<h2>Kontak</h2>${f("nama", "Nama lengkap", "Contoh: Ayu Lestari")}${f("hp", "Nomor WhatsApp", "08xxxxxxxxxx", "tel")}${f("email", "Email (opsional)", "nama@email.com", "email")}`,
    `<h2>Alamat dan ongkir</h2>${f("alamat", "Alamat lengkap", "Jalan, nomor, RT/RW")}${f("kota", "Kota/kecamatan", "Contoh: Surabaya")}<div id="ship"></div>`,
    `<h2>Pembayaran</h2>${["QRIS", "VA BCA", "VA Mandiri", "GoPay", "OVO"].map(m => `<div class="opt ${d.pay === m ? "on" : ""}" data-pay="${m}" tabindex="0" role="radio" aria-checked="${d.pay === m}"><span>${m}</span><span>${d.pay === m ? "✓" : ""}</span></div>`).join("")}`,
    `<h2>Konfirmasi</h2><div class="box"><p><b>${d.nama}</b> · ${d.hp}</p><p>${d.alamat}, ${d.kota}</p><p>Kurir: ${COURIERS[d.kurir]?.[0]}</p><p>Bayar: ${d.pay}</p></div>`
  ][co.step];
  box.innerHTML = `<div class="step" style="--dir:${co.dir}">${html}<div style="display:flex;gap:8px;margin-top:6px">${co.step ? `<button class="btn ghost" id="back">Kembali</button>` : ""}<button class="btn" id="next" style="flex:1">${co.step === 3 ? "Buat pesanan" : "Lanjut"}</button></div></div>`;
  if (co.step === 1) shipPaint();
  $$("[data-pay]").forEach(o => o.onclick = () => { d.pay = o.dataset.pay; co.dir = 0; stepPaint() });
  $$(".field").forEach(i => i.oninput = () => { d[i.id] = i.value; i.classList.remove("bad"); if (i.id === "kota") shipPaint() });
  $("#back") && ($("#back").onclick = () => { co.step--; co.dir = -1; stepPaint() });
  $("#next").onclick = next; sumPaint();
}
function shipPaint() {
  const d = co.d, s = $("#ship"); if (!s) return; if (d.kota.trim().length < 3) { s.innerHTML = ""; d.kurir = null; return sumPaint() }
  /* TODO(API): ganti dengan Biteship/RajaOngkir */
  s.innerHTML = COURIERS.map((c, i) => { const cost = Math.round((9000 + d.kota.length * 800) * c[1] / 500) * 500; return `<div class="opt ${d.kurir === i ? "on" : ""}" data-k="${i}" style="animation-delay:${i * 80}ms" tabindex="0"><span>${c[0]} <small>${c[2]}</small></span><b>${rp(cost)}</b></div>` }).join("");
  $$("[data-k]").forEach(o => o.onclick = () => { d.kurir = +o.dataset.k; shipPaint() }); sumPaint();
}
function sumPaint() {
  const s = shipCost(), dc = discount(s), tot = subtotal() + s - dc;
  $("#sum").innerHTML = `<b>Ringkasan</b>${cart.map(x => `<div class="row"><span>${byId(x.id).name} ×${x.q}</span><span>${rp(byId(x.id).price * x.q)}</span></div>`).join("")}<div class="row"><span>Ongkir</span><span>${co.d.kurir == null ? "–" : rp(s)}</span></div>${dc ? `<div class="row"><span>Diskon</span><span>−${rp(dc)}</span></div>` : ""}<div class="row tot"><span>Total</span><span>${rp(tot)}</span></div>`; co.total = tot;
}
function next() {
  const d = co.d, bad = [];
  if (co.step === 0) { if (d.nama.trim().length < 3) bad.push("nama"); if (!/^08\d{8,11}$/.test(d.hp.replace(/\D/g, ""))) bad.push("hp") }
  if (co.step === 1) { if (d.alamat.trim().length < 6) bad.push("alamat"); if (d.kota.trim().length < 3) bad.push("kota"); if (!bad.length && d.kurir == null) { toast("Pilih kurir terlebih dahulu"); return } }
  if (bad.length) { bad.forEach(i => { const e = $("#" + i); e.classList.remove("bad"); void e.offsetWidth; e.classList.add("bad") }); return toast("Mohon lengkapi data yang ditandai") }
  if (co.step < 3) { co.step++; co.dir = 1; return stepPaint() }
  /* TODO(API): buat transaksi Midtrans/Xendit di sini */
  const no = "FB-" + (1000 + orders.length + 1);
  orders.push({ no, status: "Menunggu bayar", total: co.total, resi: "", pay: d.pay, at: Date.now() + 15 * 60000 }); save("orders", orders); cart = []; voucher = null; save("voucher", null); updateBadges(); location.hash = "#/bayar/" + no;
}
function initPay(no) {
  const o = orders.find(x => x.no === no); if (!o || o.status !== "Menunggu bayar") { if (o?.status !== "Menunggu bayar" && o) confetti(); return }
  const end = o.at || Date.now() + 9e5;
  const t = setInterval(() => { const l = Math.max(0, end - Date.now()), el = $("#cd"); if (!el) return clearInterval(t); el.textContent = String(Math.floor(l / 60000)).padStart(2, "0") + ":" + String(Math.floor(l % 60000 / 1000)).padStart(2, "0"); if (!l) { clearInterval(t); o.status = "Kedaluwarsa"; save("orders", orders); $("#app").innerHTML = `<div class="empty"><h2>Waktu pembayaran habis</h2><p>Stok sudah dilepas kembali. Silakan pesan ulang.</p><a class="btn" href="#/katalog">Belanja lagi</a></div>` } }, 1000);
  $("#paid").onclick = () => { clearInterval(t); o.status = "Dibayar"; save("orders", orders); render() }; /* TODO(API): webhook status pembayaran */
}
function confetti() { if (reduce) return; for (let i = 0; i < 40; i++) { const c = document.createElement("i"); c.className = "conf"; c.style.cssText = `left:${Math.random() * 100}vw;background:${["#C9748A", "#F6E3E8", "#A8566B", "#E8D9C5"][i % 4]};animation-delay:${Math.random() * .6}s`; document.body.append(c); setTimeout(() => c.remove(), 3000) } }

/* ===== Navbar, pencarian, cookie, splash ===== */
let ly = 0; addEventListener("scroll", () => { const y = scrollY, n = $("#nav"); n.classList.toggle("shadow", y > 10); n.classList.toggle("hide", y > ly && y > 160 && y - ly > 6); if (y < ly) n.classList.remove("hide"); ly = y }, { passive: true });
const q = $("#q"), sg = $("#suggest");
q.oninput = () => { const v = q.value.trim().toLowerCase(); const m = v.length > 1 ? P.filter(p => p.name.toLowerCase().includes(v)).slice(0, 5) : []; sg.hidden = !m.length; sg.innerHTML = m.map(p => `<li data-n="${p.id}">${p.name}</li>`).join("") };
sg.onclick = e => { if (e.target.dataset.n) { location.hash = "#/produk/" + e.target.dataset.n; sg.hidden = true; q.value = "" } };
$("#searchForm").onsubmit = e => { e.preventDefault(); location.hash = "#/katalog?s=" + encodeURIComponent(q.value.trim()); sg.hidden = true };
document.addEventListener("click", e => { if (!e.target.closest(".search")) sg.hidden = true });
const ck = $("#cookie"), ckOk = $("#cookieOk");
if (ck && ckOk && !load("cookie", false)) { ck.hidden = false; ckOk.onclick = () => { save("cookie", true); ck.hidden = true } }
/* Kupu-kupu kecil: hanya muncul saat logo/tulisan Farabelle diklik */
function kupuLogo(from) {
  if (reduce) return;
  const lama = document.getElementById("kupu-logo"); if (lama) lama.remove();
  const k = document.createElement("div");
  k.id = "kupu-logo"; k.setAttribute("aria-hidden", "true");
  k.innerHTML = '<div class="kl-in"><i class="kl-l"></i><i class="kl-r"></i></div>';
  document.body.append(k);
  const r = from.getBoundingClientRect();
  const x0 = r.left + r.width / 2 - 32, y0 = r.top + r.height / 2 - 32;
  const x1 = Math.min(innerWidth - 80, x0 + 260), y1 = y0 + 70;
  const x2 = Math.min(innerWidth - 80, x0 + 480), y2 = Math.max(10, y0 - 40);
  k.animate([
    { transform: `translate(${x0}px,${y0}px) scale(.5) rotate(0deg)`, opacity: 0 },
    { transform: `translate(${x0 + 60}px,${y0 - 30}px) scale(1) rotate(12deg)`, opacity: 1, offset: .15 },
    { transform: `translate(${x1}px,${y1}px) scale(1) rotate(-10deg)`, opacity: 1, offset: .6 },
    { transform: `translate(${x2}px,${y2}px) scale(.8) rotate(10deg)`, opacity: 0 }
  ], { duration: 3200, easing: "ease-in-out", fill: "both" }).onfinish = () => k.remove();
}
document.addEventListener("click", e => {
  const l = e.target.closest("#nav .brand, #nav .logo");
  if (l) kupuLogo(l);
});
/* Kupu-kupu versi baru: terbang dari pojok kiri bawah ke pojok kanan atas + kilau */
function kupuLogo() {
  if (reduce) return;
  const lama = document.getElementById("kupu-logo"); if (lama) lama.remove();
  const k = document.createElement("div");
  k.id = "kupu-logo"; k.setAttribute("aria-hidden", "true");
  k.innerHTML = '<div class="kl-in"><i class="kl-l"></i><i class="kl-r"></i></div>';
  document.body.append(k);
  const W = innerWidth, H = innerHeight, o = 32;
  const t = (x, y, s, r) => `translate(${x - o}px,${y - o}px) scale(${s}) rotate(${r}deg)`;
  const anim = k.animate([
    { transform: t(-70, H - 30, .6, -10), opacity: 0 },
    { transform: t(W * .15, H * .78, 1, 8), opacity: 1, offset: .12 },
    { transform: t(W * .35, H * .55, 1, -8), opacity: 1, offset: .38 },
    { transform: t(W * .58, H * .48, 1, 8), opacity: 1, offset: .6 },
    { transform: t(W * .82, H * .2, 1, -6), opacity: 1, offset: .85 },
    { transform: t(W + 40, -70, .8, 6), opacity: 0 }
  ], { duration: 4600, easing: "ease-in-out", fill: "both" });
  const warna = ["#FFE29A", "#FFB6D1", "#FFFFFF", "#F7C455"];
  const kilau = setInterval(() => {
    const r = k.getBoundingClientRect(); if (+getComputedStyle(k).opacity < .2) return;
    for (let i = 0; i < 2; i++) {
      const s = document.createElement("div"), size = 8 + Math.random() * 12, c = warna[Math.floor(Math.random() * warna.length)];
      s.className = "kl-star"; s.style.cssText = `--c:${c};width:${size}px;height:${size}px;left:${r.left + r.width / 2 + (Math.random() - .5) * 60}px;top:${r.top + r.height / 2 + (Math.random() - .5) * 50}px`;
      s.innerHTML = "<i></i>"; document.body.append(s);
      s.animate([{ opacity: 0, transform: "scale(.2) rotate(0)" }, { opacity: 1, transform: "scale(1) rotate(45deg)", offset: .35 }, { opacity: 0, transform: `translateY(${20 + Math.random() * 30}px) scale(.3) rotate(90deg)` }], { duration: 900, easing: "ease-out" }).onfinish = () => s.remove();
    }
  }, 70);
  anim.onfinish = () => { clearInterval(kilau); k.remove(); };
}
updateBadges(); render();
// LOADING KUPU-KUPU SAAT PINDAH HALAMAN
const butterflyTransition = document.getElementById("butterfly-transition");
window.addEventListener("hashchange", function () {
  if (!butterflyTransition) return;
  butterflyTransition.classList.add("active");
  setTimeout(function () {
    butterflyTransition.classList.remove("active");
  }, 2000);
});
/* Kupu-kupu pita Farabelle: terbang dari pojok kiri bawah ke pojok kanan atas tiap pindah menu */
(function () {
  if (window.__kupuMenu) return; window.__kupuMenu = true;
  function init() {
    try {
      var wrap = document.createElement("div"); wrap.id = "km-wrap"; wrap.setAttribute("aria-hidden", "true");
      wrap.innerHTML = '<div class="km-path"><div class="km-glow"></div><div class="km-in"><span class="km-l"></span><span class="km-r"></span></div></div>';
      document.body.appendChild(wrap);
      var el = wrap.firstChild, anim = null, timer = null, last = 0;
      var still = window.matchMedia && matchMedia("(prefers-reduced-motion:reduce)").matches;
      var GOLD = ["#F2B134", "#F7C455", "#EFA93A"], PINK = ["#F08FAE", "#F5A3BC", "#EE7FA3"];
      function rnd(a, b) { return a + Math.random() * (b - a); }
      function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
      function clean() { var n = wrap.querySelectorAll(".km-star,.km-dust"); for (var i = 0; i < n.length; i++) n[i].remove(); }
      function star(x, y, size, color, delay, dur) {
        var s = document.createElement("span"); s.className = "km-star";
        s.style.cssText = "left:" + x.toFixed(0) + "px;top:" + y.toFixed(0) + "px;width:" + size.toFixed(0) + "px;height:" + size.toFixed(0) + "px;--c:" + color;
        s.innerHTML = "<i></i>"; wrap.appendChild(s);
        var a = s.animate([
          { opacity: 0, transform: "translate(-50%,-50%) scale(0) rotate(0deg)", offset: 0 },
          { opacity: 1, transform: "translate(-50%,-50%) scale(1) rotate(50deg)", offset: 0.35 },
          { opacity: 0.9, transform: "translate(-50%,-50%) scale(.6) rotate(100deg)", offset: 0.7 },
          { opacity: 0, transform: "translate(-50%,-50%) scale(0) rotate(150deg)", offset: 1 }
        ], { duration: dur, delay: delay, fill: "both", easing: "ease-out" });
        a.onfinish = function () { s.remove(); };
      }
      function dust(x, y, size, color, delay, dur, dx, dy) {
        var s = document.createElement("span"); s.className = "km-dust";
        s.style.cssText = "left:" + x.toFixed(0) + "px;top:" + y.toFixed(0) + "px;width:" + size.toFixed(1) + "px;height:" + size.toFixed(1) + "px;--c:" + color;
        wrap.appendChild(s);
        var a = s.animate([
          { opacity: 0, transform: "translate(0,0) scale(.4)", offset: 0 },
          { opacity: 1, transform: "translate(" + (dx * 0.3).toFixed(0) + "px," + (dy * 0.3).toFixed(0) + "px) scale(1)", offset: 0.25 },
          { opacity: 0, transform: "translate(" + dx.toFixed(0) + "px," + dy.toFixed(0) + "px) scale(.3)", offset: 1 }
        ], { duration: dur, delay: delay, fill: "both", easing: "ease-out" });
        a.onfinish = function () { s.remove(); };
      }
      function fly() {
        var now = Date.now(); if (now - last < 300) return; last = now;
        clearTimeout(timer); if (anim) anim.cancel(); clean(); wrap.classList.add("show");
        if (still || !el.animate) { timer = setTimeout(function () { wrap.classList.remove("show"); }, 400); return; }
        var W = innerWidth, H = innerHeight, S = el.offsetWidth || 150, N = 90, DUR = 2600, kf = [], i;
        /* jalur: kiri bawah -> kanan atas, meliuk naik-turun, kecepatan berubah-ubah seperti kupu-kupu asli */
        function pt(t) {
          var e = t + Math.sin(t * Math.PI * 2) * -0.035 + Math.sin(t * Math.PI * 6) * 0.008;
          var env = Math.sin(Math.PI * Math.min(1, t * 1.04));
          return { x: -S * 1.1 + (W + S * 1.6) * e + Math.sin(t * Math.PI * 3.4) * W * 0.012,
                   y: H - (H + S * 1.5) * e + Math.sin(t * Math.PI * 5.2) * H * 0.085 * env + Math.sin(t * Math.PI * 11) * H * 0.012 };
        }
        for (i = 0; i <= N; i++) {
          var t = i / N, p = pt(t), q = pt(Math.min(1, t + 0.01));
          var rot = Math.atan2(q.y - p.y, q.x - p.x) * 180 / Math.PI * 0.42 + Math.sin(t * Math.PI * 8) * 5;
          var sc = 0.85 + 0.3 * t, op = t < 0.04 ? t / 0.04 : (t > 0.96 ? (1 - t) / 0.04 : 1);
          kf.push({ transform: "translate(" + p.x.toFixed(1) + "px," + p.y.toFixed(1) + "px) rotate(" + rot.toFixed(1) + "deg) scale(" + sc.toFixed(2) + ")", opacity: op });
        }
        anim = el.animate(kf, { duration: DUR, easing: "linear", fill: "both" });
        /* bling-bling: bintang berkilau + debu peri di belakang kupu-kupu */
        for (i = 0; i < 46; i++) {
          var ts = rnd(0.03, 0.97), ps = pt(ts), pe = pt(Math.min(1, ts + 0.01));
          var vx = pe.x - ps.x, vy = pe.y - ps.y, vl = Math.sqrt(vx * vx + vy * vy) || 1, back = S * rnd(0.15, 0.7);
          star(ps.x + S / 2 - vx / vl * back + rnd(-S * 0.4, S * 0.4), ps.y + S / 2 - vy / vl * back + rnd(-S * 0.4, S * 0.4),
               rnd(18, 40), Math.random() < 0.55 ? pick(GOLD) : pick(PINK), ts * DUR + rnd(0, 120), rnd(750, 1150));
        }
        for (i = 0; i < 60; i++) {
          var td = rnd(0.03, 0.97), pd = pt(td);
          dust(pd.x + S / 2 + rnd(-S * 0.45, S * 0.3), pd.y + S / 2 + rnd(-S * 0.2, S * 0.45), rnd(3, 7),
               Math.random() < 0.5 ? pick(GOLD) : pick(PINK), td * DUR + rnd(0, 100), rnd(700, 1200), rnd(-18, 18), rnd(24, 70));
        }
        var me = anim; me.onfinish = function () { if (anim === me) wrap.classList.remove("show"); };
        timer = setTimeout(function () { wrap.classList.remove("show"); clean(); }, DUR + 1500);
      }
      addEventListener("hashchange", fly);
      document.addEventListener("click", function (e) {   /* klik menu navigasi (termasuk menu yang sedang aktif) */
        var a = e.target && e.target.closest ? e.target.closest("#tabs a, #tabs button") : null;
        if (a) setTimeout(fly, 0);
      });
    } catch (err) { console.warn("kupu-menu:", err); }
  }
  if (document.body) init(); else document.addEventListener("DOMContentLoaded", init);
})();