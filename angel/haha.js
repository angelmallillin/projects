 <script>
    let currentSlide = 1;
    const totalSlides = 5;
    let selectedCategory = 'all';

    /* THEME TOGGLE FUNCTION */
    function toggleTheme() {
      const body = document.body;
      body.classList.toggle('light-mode');
      const isLight = body.classList.contains('light-mode');
      
      document.getElementById('themeIcon').innerText = isLight ? '☀️' : '🌙';
      const themeText = document.getElementById('themeText');
      if (themeText) themeText.innerText = isLight ? 'Light' : 'Dark';
    }

    /* HELPER FUNCTION TO GENERATE COSTING TABLE HTML
       Alis ang Price sa markup row; Percentage (%) nalang ang ipinapakita. */
    const MARKUP_RATE = 0.5;

    function createCostingTable(basePrice, packaging, o = {}) {
      const totalCost = o.total !== undefined ? o.total : basePrice + packaging;
      const srp = o.srp !== undefined ? o.srp : totalCost * (1 + MARKUP_RATE);
      const profitPerUnit = o.profit !== undefined ? o.profit : srp - totalCost;
      
      // Calculate dynamic markup % based on Total Cost and Profit if not explicitly passed
      const calculatedMarkupPct = ((profitPerUnit / totalCost) * 100).toFixed(2);
      const markupLabel = o.markupLabel || `Markup (${calculatedMarkupPct}%)`;
      const peso = (n) => '₱' + n.toFixed(2);

      return `
        <table class="costing-table">
          <thead>
            <tr>
              <th>Costing Item Breakdown</th>
              <th class="num">Amount (₱)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Base Price</td>
              <td class="num">${peso(basePrice)}</td>
            </tr>
            <tr>
              <td>Packaging</td>
              <td class="num">${peso(packaging)}</td>
            </tr>
            <tr class="total-row">
              <td>Total Cost</td>
              <td class="num">${peso(totalCost)}</td>
            </tr>
            <tr>
              <td>${markupLabel}</td>
              <td class="num">&mdash;</td>
            </tr>
            <tr>
              <td>SRP</td>
              <td class="num">${peso(srp)}</td>
            </tr>
            <tr class="total-row" style="background: rgba(130, 163, 40, 0.25);">
              <td><strong>Profit per Unit</strong></td>
              <td class="num"><strong>${peso(profitPerUnit)}</strong></td>
            </tr>
          </tbody>
        </table>
      `;
    }

    /* PRODUCT DATABASE WITH UPDATED COSTING & SRPs */
    const productDatabase = {
      "liquid body soap": {
        name: "Liquid Body Soap",
        img: "shower.jpg",
        pills: ["Body Wash", "Nourishing", "Gentle", "pH Balanced"],
        costingHtml: createCostingTable(5.52, 20, { total: 25.52, srp: 85, profit: 59.48, markupLabel: 'Markup (233.07%)' }),
        whatFor: "Calvin Klein Free Liquid Body Soap is formulated for gentle, everyday bathing and cleansing. Suitable for sensitive skin to help soothe irritation, lock in hydration, and prevent dryness.\n*Recommended for daily shower use."
      },
      "body soap bar": {
        name: "Body Soap Bar",
        img: "soaps.jpg",
        pills: ["Handcrafted Soap", "Deep Cleansing", "Soothing", "Natural Oils"],
        costingHtml: createCostingTable(22.30, 20, { total: 42.30, srp: 63.45, profit: 21.15 }),
        whatFor: "Cold-process body soap bar engineered to cleanse away dirt and impurities while maintaining skin oil balance and aromatic fresh feel.\n*Suitable for daily face and body bathing."
      },
      "body lotion": {
        name: "Body Lotion",
        img: "lotion.jpg",
        pills: ["Hydrating Cream", "Shea Butter", "Non-Greasy", "24H Moisture"],
        costingHtml: createCostingTable(28.80, 30, { total: 58.80, srp: 105, profit: 46.20, markupLabel: 'Markup (78.57%)' }),
        whatFor: "Deep moisturizing lotion that softens dry patches and restores skin elasticity with non-greasy absorption and scent lingering.\n*Best applied right after shower."
      },
      "hand cream": {
        name: "Hand Cream",
        img: "hand.jpg",
        pills: ["Hand Repair", "Quick Absorbing", "Protective", "Velvety Finish"],
        costingHtml: createCostingTable(7.34, 25, { total: 32.34, srp: 48.51, profit: 16.17 }),
        whatFor: "Intensive skin barrier hand cream designed to protect palms and cuticles from frequent washing, dryness, and harsh weather.\n*Recommended for daily pocket carry."
      },
      "bath bomb": {
        name: "Bath Bomb",
        img: "bomb.jpg",
        pills: ["Spa Experience", "Epsom Salt", "Relaxing Aromatherapy", "Effervescent"],
        costingHtml: createCostingTable(74.94, 20, { total: 94.94, srp: 142.41, profit: 47.47 }),
        whatFor: "Effervescent aromatherapy bath sphere designed to dissolve in warm water, releasing soothing minerals and aromatic oils for stress relief."
      },
      "body scrub": {
        name: "Body Scrub",
        img: "scrub.jpg",
        pills: ["Exfoliating Scrub", "Smooth Skin", "Natural Sugar/Salt", "Deep Renewal"],
        costingHtml: createCostingTable(67.37, 30, { total: 97.37, srp: 146.06, profit: 48.69 }),
        whatFor: "Gentle botanical body scrub formulated with fine exfoliants to sweep away dead skin cells, refine texture, and leave skin velvety soft.\n*Recommended 2-3 times per week."
      },
      "hand sanitizer": {
        name: "Hand Sanitizer Gel",
        img: "gel.jpg",
        pills: ["Antibacterial", "70% Isopropyl", "Aloe Hydration", "Fast Drying"],
        costingHtml: createCostingTable(18.34, 18, { total: 36.34, srp: 54.51, profit: 18.17 }),
        whatFor: "Instant rinse-free hand gel formulated with 70% alcohol and moisturizing aloe vera to eliminate germs while keeping hands soft."
      },
      "hand sanitizer (spray on)": {
        name: "Hand Sanitizer (Spray On)",
        img: "sanitizer.jpg",
        pills: ["Fine Mist Spray", "70% Alcohol", "Pocket Size", "Quick Dry"],
        costingHtml: createCostingTable(5.14, 25, { total: 30.14, srp: 45.21, profit: 15.07 }),
        whatFor: "Fast-drying micro-mist sanitizer spray powered by 70% ethyl alcohol and aloe hydrosol for quick touch-point and hand sanitization on the go."
      },
      "hand soap": {
        name: "Hand Soap",
        img: "hands.jpg",
        pills: ["Foaming Cleanser", "Frequent Wash", "Moisture Guard", "Rich Lather"],
        costingHtml: createCostingTable(22.30, 20, { total: 42.30, srp: 63.45, profit: 21.15 }),
        whatFor: "Gentle foaming liquid hand soap designed for frequent washbasin use, eliminating dirt and bacteria without stripping skin hydration."
      },
      "feminine spray": {
        name: "Feminine Spray",
        img: "feminine.jpg",
        pills: ["Intimate Hygiene", "pH Balanced", "Odor Control", "Gentle Mist"],
        costingHtml: createCostingTable(38.88, 26, { total: 64.88, srp: 99, profit: 32.44 }),
        whatFor: "Dermatologically tested pH-balanced refreshing intimate mist designed to maintain hygiene, prevent odor, and soothe skin."
      },
      "masculine wash": {
        name: "Masculine Wash",
        img: "masculine.jpg",
        pills: ["Intimate Wash", "Cooling Sensation", "Odor Protection", "pH Neutral"],
        costingHtml: createCostingTable(6.53, 25, { total: 31.53, srp: 47, profit: 15.77 }),
        whatFor: "Specially formulated intimate cleansing gel for men with cooling menthol, tea tree extract, and scent fixatives to ensure freshness and odor control."
      },
      "roll on deodorant": {
        name: "Roll-On Deodorant",
        img: "deodorant.jpg",
        pills: ["Roll-On", "Odor Control", "Quick Dry", "Gentle on Skin"],
        costingHtml: createCostingTable(15.44, 30, { total: 45.44, srp: 68.16, profit: 22.72 }),
        whatFor: "Roll-on deodorant that helps control underarm odor and keeps you feeling fresh all day, with a light signature scent and a smooth, quick-drying glide.\n*Apply on clean, dry underarms."
      },
      "hair shampoo": {
        name: "Hair Shampoo",
        img: "shampoo.jpg",
        pills: ["Scalp Care", "Sulfate-Free", "Volumizing", "Nourishing"],
        costingHtml: createCostingTable(45.55, 20, { total: 65.55, srp: 98.33, profit: 32.78 }),
        whatFor: "Sulfate-free scalp cleansing shampoo designed to eliminate oil build-up, strengthen hair roots, and impart a subtle fresh aroma."
      },
      "conditioner": {
        name: "Conditioner",
        img: "conditioner.jpg",
        pills: ["Deep Conditioning", "Frizz Control", "Silky Smooth", "Detangling"],
        costingHtml: createCostingTable(19, 21),
        whatFor: "Deep conditioning treatment cream that detangles strands, tames frizz, and locks in moisture and woody scent notes."
      },
      "hair mist": {
        name: "Hair Mist",
        img: "hair.jpg",
        pills: ["Hair Perfume", "Alcohol-Free", "Shine Enhancer", "Lightweight"],
        costingHtml: createCostingTable(64.64, 25, { total: 93.64, srp: 140, profit: 46.82 }),
        whatFor: "Alcohol-free scented hair spray that neutralizes odor from smoke/food while providing delicate fragrance and healthy gloss."
      },
      "dry shampoo powder": {
        name: "Dry Shampoo Powder",
        img: "powder.jpg",
        pills: ["Oil Absorbing", "Instant Volume", "Translucent", "Scalp Refresh"],
        costingHtml: createCostingTable(40, 30, { total: 70, srp: 105, profit: 35 }),
        whatFor: "Oil-absorbing translucent rice powder that instantly refreshes limp hair, absorbs excess scalp grease, and restores volume between wash days."
      },
      "face mist hydrating": {
        name: "Face Mist - Hydrating",
        img: "face.jpg",
        pills: ["Facial Hydration", "Hyaluronic Acid", "Calming Mist", "Soothing"],
        costingHtml: createCostingTable(9.98, 25, { total: 34.98, srp: 105, profit: 70.02, markupLabel: 'Markup (200.17%)' }),
        whatFor: "Ultra-gentle facial hydration spray formulated with botanical water and hyaluronic acid to revive tired skin and set makeup."
      },
      "fine fragrance": {
        name: "Fine Fragrance",
        img: "perfume.jpg",
        pills: ["Eau de Parfum", "Long-Lasting", "Woody Aromatic", "Premium Spray"],
        costingHtml: createCostingTable(39, 75, { total: 114, srp: 250, profit: 136, markupLabel: 'Markup (119.30%)' }),
        whatFor: "Concentrated Eau de Parfum fragrance spray featuring the rich Juniper, Suede, and Cedarwood scent pyramid with 8+ hours persistence."
      },
      "scented candle": {
        name: "Scented Candle",
        img: "scented.jpg",
        pills: ["Soy Wax Blend", "40+ Hour Burn", "Aromatherapy", "Lead-Free Wick"],
        costingHtml: createCostingTable(42.55, 40, { total: 82.55, srp: 123.83, profit: 41.28 }),
        whatFor: "Hand-poured soy wax candle formulated for wide room scent diffusion, creating a calm and luxurious indoor ambient atmosphere."
      },
      "essential oil": {
        name: "Essential Oil",
        img: "oil.jpg",
        pills: ["100% Pure Blend", "Diffuser Drop", "Room Fragrance", "Concentrate"],
        costingHtml: createCostingTable(26, 20, { total: 46, srp: 69, profit: 23 }),
        whatFor: "Undiluted fragrance oil blend crafted for ultrasonic diffusers, potpourri, and room scenting devices."
      },
      "pillow mist room linen": {
        name: "Pillow Mist",
        img: "room.jpg",
        pills: ["Linen Spray", "Sleep Sanctuary", "Relaxing Aroma", "Bedding Fresh"],
        costingHtml: createCostingTable(18, 22),
        whatFor: "Soothing linen and room mist designed to spray on bed sheets, pillows, and curtains to promote a tranquil relaxation environment."
      },
      "essential air freshener car": {
        name: "Car Air Freshener",
        img: "car.jpg",
        pills: ["Car Diffuser", "Wooden Cap", "Continuous Release", "Auto Odor Control"],
        costingHtml: createCostingTable(2.44, 20, { total: 22.44, srp: 60, profit: 37.56, markupLabel: 'Markup (167.38%)' }),
        whatFor: "Hanging glass vessel with permeable wooden cap designed for slow, continuous diffusion of fresh woody fragrance inside vehicle interiors."
      }
    };

    /* OPEN PRODUCT MODAL */
    function openProductByKey(key) {
      const data = productDatabase[key.toLowerCase()];
      if (!data) return;

      document.getElementById('mName').innerText = data.name;
      document.getElementById('mImg').style.backgroundImage = `url('${data.img}')`;
      
      const pillsContainer = document.getElementById('mPillsContainer');
      pillsContainer.innerHTML = '';
      data.pills.forEach(pillText => {
        const span = document.createElement('span');
        span.className = 'pill-tag';
        span.innerText = pillText;
        pillsContainer.appendChild(span);
      });

      document.getElementById('mWhatFor').innerText = data.whatFor;
      document.getElementById('mCostingContainer').innerHTML = data.costingHtml;

      document.getElementById('productDetailModal').style.display = 'flex';
    }

    /* FEATURE 1: INTERACTIVE SCENT PYRAMID LOGIC */
    function selectPyramid(layer) {
      document.querySelectorAll('.pyramid-level').forEach(el => el.classList.remove('active'));
      document.getElementById('pyr-' + layer).classList.add('active');

      const title = document.getElementById('p-title');
      const desc = document.getElementById('p-desc');
      const lab = document.getElementById('p-lab');

      if (layer === 'top') {
        title.innerText = "Top Notes: Immediate Fresh Impact";
        desc.innerText = "Provides immediate fresh, aromatic top impact. Highly volatile molecules ideal for hair mists, face mists, and room fresheners.";
        lab.innerText = "Evaporates within 15–30 minutes on skin; optimized for top notes in spray formats.";
      } else if (layer === 'heart') {
        title.innerText = "Heart Notes: Warm & Luxurious Core";
        desc.innerText = "Rich Suede, Coffee, and Tobacco notes give warmth and luxury feel, perfect for fine fragrances, body lotions, and hand creams.";
        lab.innerText = "Lasts 2–4 hours; acts as the primary character anchor for body care formulations.";
      } else if (layer === 'base') {
        title.innerText = "Base Notes: Deep Fixative Foundation";
        desc.innerText = "Long-lasting Cedarwood, Oak, and Patchouli fixatives that linger on skin and prolong scent throw in candles and diffusers.";
        lab.innerText = "Lingers 6–12+ hours; provides grounding stability and long-term scent longevity.";
      }
    }

    /* CONTACTS: TOAST, COPY, TOPIC CHIPS & INQUIRY FORM */
    const CONTACT_EMAIL = 'lab.formula@calvinklein.com';
    let toastTimer;

    function showToast(msg) {
      const t = document.getElementById('toast');
      t.innerText = msg;
      t.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
    }

    function copyText(text, label) {
      const done = () => showToast(label + ' copied \u2713');
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
      } else {
        fallbackCopy(text, done);
      }
    }

    function fallbackCopy(text, cb) {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); cb(); } catch (e) { showToast('Press Ctrl+C to copy'); }
      document.body.removeChild(ta);
    }

    function setTopic(btn, topic, starter) {
      document.getElementById('cf-topic').value = topic;
      const msg = document.getElementById('cf-message');
      if (!msg.value.trim()) msg.value = starter;
      document.querySelectorAll('.topic-chip').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      msg.focus();
      msg.setSelectionRange(msg.value.length, msg.value.length);
    }

    function sendInquiry(e) {
      e.preventDefault();
      const name = document.getElementById('cf-name').value.trim();
      const contact = document.getElementById('cf-contact').value.trim();
      const topic = document.getElementById('cf-topic').value;
      const message = document.getElementById('cf-message').value.trim();
      const subject = 'Calvin Klein Free \u2013 ' + topic;
      const body = 'Hi Calvin Klein Free team,\n\n' + message + '\n\n\u2014 ' + name + '\nReach me at: ' + contact;
      window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      showToast('Opening your email app\u2026');
    }

    /* TARGET MARKET */
    const TARGET_SEGMENTS = [
      {
        id: 'pros', emoji: '\u{1F9D1}\u200D\u{1F4BC}', name: 'Young Professionals', short: 'Ages 22\u201335 \u00B7 office, commute, gym',
        tagline: 'Fresh from the first meeting to the last train home.',
        who: ['Ages 22\u201335, working in offices or hybrid setups', 'Always on the go: commute, gym, after-work plans', 'Discover and buy through social media and online shops'],
        needs: ['Grab-and-go scent that lasts all day', 'Small, bag-friendly formats', 'A signature scent that feels clean and put-together'],
        products: ['hair mist', 'face mist hydrating', 'hand sanitizer (spray on)', 'hand cream', 'roll on deodorant', 'fine fragrance']
      },
      {
        id: 'home', emoji: '\u{1F3E1}', name: 'Home Comfort Seekers', short: 'Ages 25\u201345 \u00B7 WFH, couples, families',
        tagline: 'Turn every room into a calm, woody sanctuary.',
        who: ['Ages 25\u201345, working or studying from home', 'Couples and young families who enjoy a cozy space', 'Treat self-care and ambiance as a daily ritual'],
        needs: ['Relaxing scent for evenings and sleep', 'Home scents that match their body-care routine', 'Gentle, real-ingredient products'],
        products: ['scented candle', 'pillow mist room linen', 'essential oil', 'bath bomb', 'body lotion']
      },
      {
        id: 'gift', emoji: '\u{1F381}', name: 'Gift Givers', short: 'Ages 20\u201350 \u00B7 birthdays, holidays, thank-yous',
        tagline: 'A thoughtful gift that actually smells expensive.',
        who: ['Ages 20\u201350 shopping for friends, family, and officemates', 'Peak buying: birthdays, Christmas, Valentine\u2019s, Mother\u2019s/Father\u2019s Day', 'Judge a gift by its look and packaging'],
        needs: ['Beautiful packaging that is ready to give', 'Affordable gifts that still feel premium', 'Bundles so they don\u2019t have to choose'],
        products: ['fine fragrance', 'bath bomb', 'body soap bar', 'scented candle', 'body scrub']
      },
      {
        id: 'drivers', emoji: '\u{1F697}', name: 'Drivers & Commuters', short: 'Car owners \u00B7 ride-hailing \u00B7 delivery riders',
        tagline: 'Keep every ride fresh and clean.',
        who: ['Car owners, ride-hailing and delivery drivers', 'Spend hours inside a vehicle every day', 'Want something cheap, easy, and long-lasting'],
        needs: ['Odor control and a fresh, woody car scent', 'Quick hand hygiene between trips', 'Low-price items they can buy in multiples'],
        products: ['essential air freshener car', 'hand sanitizer (spray on)', 'hand sanitizer', 'essential oil']
      },
      {
        id: 'men', emoji: '\u{1F9D4}', name: 'Men\u2019s Grooming', short: 'Ages 18\u201345 \u00B7 woody, clean, low-fuss',
        tagline: 'Cedar, oak and suede \u2014 no fuss, all character.',
        who: ['Ages 18\u201345, from students to working dads', 'Prefer a simple routine with a few good products', 'Drawn to woody, aromatic, masculine scents'],
        needs: ['A scent that works across wash, hair, and fragrance', 'Value for money', 'Products that feel clean without being flowery'],
        products: ['masculine wash', 'hair shampoo', 'conditioner', 'roll on deodorant', 'dry shampoo powder', 'fine fragrance']
      },
      {
        id: 'resellers', emoji: '\u{1F6CD}\uFE0F', name: 'Resellers & Small Shops', short: 'Online sellers \u00B7 salons \u00B7 sari-sari & gift shops',
        tagline: 'A full scent line with healthy margins per unit.',
        who: ['Online sellers, salons, spas, and small retail shops', 'Want a ready-to-sell brand with a consistent scent', 'Compare cost, SRP, and profit before ordering'],
        needs: ['Clear costing and suggested retail prices', 'Products with strong profit per unit', 'A wide range to fill a shelf or a store page'],
        products: ['fine fragrance', 'face mist hydrating', 'body scrub', 'bath bomb', 'hair mist', 'scented candle']
      }
    ];

    function getPricing(key) {
      const data = productDatabase[key];
      if (!data) return null;
      const tmp = document.createElement('div');
      tmp.innerHTML = data.costingHtml;
      const rows = Array.from(tmp.querySelectorAll('tr'));
      const val = (label) => {
        const r = rows.find(r => r.children[0] && r.children[0].textContent.trim().startsWith(label));
        return r ? parseFloat(r.children[1].textContent.replace(/[^0-9.]/g, '')) || 0 : 0;
      };
      return { name: data.name, total: val('Total Cost'), srp: val('SRP'), profit: val('Profit per Unit') };
    }

    const peso = (n) => '\u20B1' + n.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    function selectSegment(id) {
      const seg = TARGET_SEGMENTS.find(x => x.id === id);
      if (!seg) return;
      document.querySelectorAll('.tm-seg').forEach(b => b.classList.toggle('active', b.dataset.id === id));

      const li = (arr) => arr.map(t => '<li>' + t + '</li>').join('');
      const chips = seg.products.map(k => {
        const p = getPricing(k);
        return p ? '<button type="button" class="tm-prod" onclick="openProductByKey(\'' + k + '\')">' + p.name + '<b>' + peso(p.srp) + '</b></button>' : '';
      }).join('');

      document.getElementById('tm-detail').innerHTML =
        '<div class="tm-head"><div class="tm-head-emoji">' + seg.emoji + '</div><div><h3>' + seg.name + '</h3><p class="tm-tag">' + seg.tagline + '</p></div></div>' +
        '<div class="tm-cols"><div><h4>Who they are</h4><ul>' + li(seg.who) + '</ul></div><div><h4>What they want</h4><ul>' + li(seg.needs) + '</ul></div></div>' +
        '<h4>Best-fit products <span style="color:var(--text-muted);font-weight:400;font-size:0.8rem;">(click for costing)</span></h4><div class="tm-prods">' + chips + '</div>';
    }

    function initTargetMarket() {
      const srps = Object.keys(productDatabase).map(k => getPricing(k).srp).filter(n => n > 0);
      document.getElementById('tm-price-range').innerText = peso(Math.min(...srps)) + ' \u2013 ' + peso(Math.max(...srps));
      document.getElementById('tm-seg-list').innerHTML = TARGET_SEGMENTS.map(x =>
        '<button type="button" class="tm-seg" data-id="' + x.id + '" onclick="selectSegment(\'' + x.id + '\')"><span class="tm-seg-emoji">' + x.emoji + '</span><span><b>' + x.name + '</b><small>' + x.short + '</small></span></button>'
      ).join('');
      selectSegment(TARGET_SEGMENTS[0].id);
    }

    /* NAVIGATION & FILTERS */
    function updateSlide() {
      document.querySelectorAll('.slide').forEach((s, idx) => {
        s.classList.toggle('active', idx + 1 === currentSlide);
      });
      document.querySelectorAll('nav a').forEach((a, idx) => {
        a.classList.toggle('active', idx + 1 === currentSlide);
      });
      document.getElementById('slide-counter').innerText = `SLIDE 0${currentSlide} / 0${totalSlides}`;
      document.getElementById('progressBar').style.width = `${(currentSlide / totalSlides) * 100}%`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function nextSlide() { if (currentSlide < totalSlides) { currentSlide++; updateSlide(); } }
    function prevSlide() { if (currentSlide > 1) { currentSlide--; updateSlide(); } }
    function goToSlide(n) { currentSlide = n; updateSlide(); }

    function filterCategory(cat, btn) {
      selectedCategory = cat;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterProducts();
    }

    function filterProducts() {
      const query = document.getElementById('searchInput').value.toLowerCase().trim();
      document.querySelectorAll('.category-column').forEach(col => {
        const catName = col.getAttribute('data-cat');
        let visibleCount = 0;
        col.querySelectorAll('li').forEach(li => {
          const prodName = li.getAttribute('data-name');
          const matchesCategory = (selectedCategory === 'all' || catName === selectedCategory);
          const matchesSearch = prodName.includes(query);
          if (matchesCategory && matchesSearch) { li.style.display = 'block'; visibleCount++; }
          else { li.style.display = 'none'; }
        });
        col.style.display = visibleCount > 0 ? 'flex' : 'none';
      });
    }

    function openPostModal(title, date, img, desc) {
      document.getElementById('pTitle').innerText = title;
      document.getElementById('pDate').innerText = 'Posted on ' + date;
      document.getElementById('pImg').style.backgroundImage = `url('${img}')`;
      document.getElementById('pDesc').innerText = desc;
      document.getElementById('postDetailModal').style.display = 'flex';
    }

    function closePostModal() { document.getElementById('postDetailModal').style.display = 'none'; }
    function closeDetailModal() { document.getElementById('productDetailModal').style.display = 'none'; }

    document.addEventListener('keydown', (e) => {
      const tag = (e.target && e.target.tagName || '').toLowerCase();
      const typing = tag === 'input' || tag === 'textarea' || tag === 'select' || (e.target && e.target.isContentEditable);
      if (e.key === 'Escape') { closeDetailModal(); closePostModal(); }
      if (typing) return;
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') { closeDetailModal(); closePostModal(); }
    });

    initTargetMarket();
  </script>