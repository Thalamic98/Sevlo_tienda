import { useEffect, useRef, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { blogConfig } from '../config';

const Blog = () => {
  if (!blogConfig.heading && blogConfig.posts.length === 0) return null;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<typeof blogConfig.posts[0] | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPost]);

  const openModal = (post: typeof blogConfig.posts[0]) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="py-24 bg-[#f7f7f7]"
    >
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className={`inline-block mb-4 text-sm tracking-[0.2em] text-[#8b6d4b] font-medium uppercase transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {blogConfig.tag}
          </span>
          <h2
            className={`font-serif text-4xl md:text-5xl text-black mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {blogConfig.heading}
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogConfig.posts.map((post, index) => (
            <article
              key={post.id}
              onClick={() => openModal(post)}
              className={`group relative h-[500px] overflow-hidden cursor-pointer transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-600"
                style={{ backgroundImage: `url(${post.image})` }}
              />

              {/* Gradient Overlay - appears on hover */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-600"
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                {/* Date */}
                <span className="text-sm font-light tracking-wide opacity-80 mb-3 transform translate-y-0 group-hover:-translate-y-4 transition-transform duration-600">
                  {post.date}
                </span>

                {/* Title */}
                <h3 className="font-serif text-2xl md:text-[26px] leading-tight mb-4 transform translate-y-0 group-hover:-translate-y-4 transition-transform duration-600">
                  {post.title}
                </h3>

                {/* Excerpt - hidden by default, shows on hover */}
                <p className="text-sm font-light opacity-0 transform translate-y-4 group-hover:opacity-80 group-hover:translate-y-0 transition-all duration-600 mb-4">
                  {post.excerpt}
                </p>

                {/* Read More Link */}
                <div className="flex items-center gap-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-600">
                  <span className="text-sm tracking-[0.2em] uppercase">{blogConfig.readMoreText}</span>
                  <ArrowRight size={16} />
                  {/* Underline animation */}
                  <div className="absolute bottom-6 left-6 h-[2px] bg-[#7f7e7e] w-0 group-hover:w-24 transition-all duration-600" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Link */}
        {blogConfig.viewAllText && (
          <div
            className={`text-center mt-12 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '900ms' }}
          >
            <a
              href="#"
              className="inline-flex items-center gap-2 text-[#8b6d4b] font-medium tracking-wide hover:gap-4 transition-all duration-300"
            >
              {blogConfig.viewAllText}
              <ArrowRight size={18} />
            </a>
          </div>
        )}
      </div>

      {/* Article Modal */}
      {selectedPost && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <div 
            className="relative bg-white rounded-2xl overflow-hidden max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#8b6d4b] hover:text-white transition-all duration-300 shadow-lg"
            >
              <X size={20} />
            </button>

            {/* Image Header */}
            <div className="h-48 md:h-64 bg-cover bg-center" style={{ backgroundImage: `url(${selectedPost.image})` }} />

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Date */}
              <span className="text-sm text-[#8b6d4b] font-medium tracking-wide">
                {selectedPost.date}
              </span>
              
              {/* Title */}
              <h2 className="font-serif text-2xl md:text-3xl text-black mt-2 mb-6">
                {selectedPost.title}
              </h2>

              {/* Article Content */}
              <div className="space-y-2">
                {selectedPost.content.map((paragraph, index) => (
                  <p 
                    key={index} 
                    className={`text-[#555] leading-relaxed ${
                      paragraph.startsWith('🌿') || paragraph.startsWith('🌸') || paragraph.startsWith('🥛')
                        ? 'font-serif text-xl text-black mt-4'
                        : paragraph.startsWith('MAÑANA') || paragraph.startsWith('NOCHE') || paragraph.startsWith('1x') || paragraph.startsWith('🔬') || paragraph.startsWith('BENEFICIOS:')
                        ? 'font-semibold text-black mt-4'
                        : paragraph === ''
                        ? 'h-2'
                        : paragraph.match(/^\d️⃣/)
                        ? 'font-semibold text-[#8b6d4b] mt-3'
                        : paragraph.startsWith('✅')
                        ? 'text-green-700 font-medium'
                        : 'text-[#666]'
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 pt-6 border-t">
                <a 
                  href="#products"
                  onClick={(e) => {
                    e.preventDefault();
                    closeModal();
                    document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#8b6d4b] text-white font-medium rounded-lg hover:bg-[#7a5f42] transition-colors"
                >
                  Ver productos relacionados
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;
