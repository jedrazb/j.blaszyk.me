"use strict";(self.webpackChunkj_blaszyk_me=self.webpackChunkj_blaszyk_me||[]).push([[362],{4816:function(e,t,n){n.r(t),n.d(t,{default:function(){return T}});var a=n(7387),r=n(8453),s=n(6540);function l(e){const t=Object.assign({p:"p",a:"a",blockquote:"blockquote",em:"em",h2:"h2",span:"span",ul:"ul",li:"li",strong:"strong",h4:"h4",h3:"h3",img:"img"},(0,r.R)(),e.components),{ImageComponent:n}=t;return n||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("ImageComponent",!0),s.createElement(s.Fragment,null,s.createElement(t.p,null,"When I joined Yelp in 2020, as a software engineer, I became part of the Ranking Platform team. The team is responsible for the development and maintenance of Yelp’s search and ranking infrastructure, a crucial part of our ecosystem, that allows for business search, reviews search and powers the internal real-time ad bidding system. At that time, I was part of an initiative to revamp our core search & ranking infra in terms of performance and cost efficiency. This effort resulted in an open-source project - ",s.createElement(t.a,{href:"https://github.com/Yelp/nrtsearch",target:"_blank",rel:"nofollow noopener noreferrer"},"nrtsearch")," - which, as of early 2023, is used for the majority of search and ranking use cases at Yelp, with more migrations underway set to replace Elasticsearch. With nrtsearch our p50s, p95s and p99s improved by 30-50% while costs dropped by as much as 40% in some cases. You can read more about the nrtsearch project results in the blog post from Yelp’s Engineering Blog:"),"\n",s.createElement(t.blockquote,null,"\n",s.createElement(t.p,null,s.createElement(t.a,{href:"https://engineeringblog.yelp.com/2021/09/nrtsearch-yelps-fast-scalable-and-cost-effective-search-engine.html",target:"_blank",rel:"nofollow noopener noreferrer"},"Nrtsearch: Yelp’s Fast, Scalable and Cost Effective Search Engine")),"\n"),"\n",s.createElement(t.p,null,"Nrtsearch development was led by senior folks, industry experts who know ins and outs of Apache Lucene - the core search library on top of which nrtsearch was built. I worked on well-scoped projects, like scalable ingestion, logging, plugin development and scatter-gather service, which allows for application-level cluster sharding. While I enjoyed those projects, I feel that, for a long time, I treated the nrtsearch core search functionality as a black-box - not fully understanding its internals. Therefore, I decided to take a step back, explore, and understand Apache Lucene - a search library at the core of nrtsearch and Elasticsearch (Elastic - a company built around Elasticsearch has a market cap of 5B$)."),"\n",s.createElement(t.p,null,"This is the first tech blog post from the series ",s.createElement(t.em,null,"Exploring Apache Lucene")," in which I’ll describe, in the bottom-up manner, the building blocks of modern search engines."),"\n",s.createElement(t.h2,{id:"lucenes-jargon",style:{position:"relative"}},s.createElement(t.a,{href:"#lucenes-jargon","aria-label":"lucenes jargon permalink",className:"anchor before"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Lucene’s jargon"),"\n",s.createElement(t.p,null,"Before starting, I want to explain some terms closely linked to Apache Lucene. They don’t necessarily map 1:1 to other DB technologies, what is at times confusing when reading Lucene’s docs and related blog posts."),"\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,s.createElement(t.strong,null,"document")," - a record, the unit of search and index, a set of fields. Documents are added to a Lucene index, and can be retrieved by a search query."),"\n",s.createElement(t.li,null,s.createElement(t.strong,null,"field")," - a typed slot in a document. A field is a sequence of terms. Document can have multiple fields."),"\n",s.createElement(t.li,null,s.createElement(t.strong,null,"term")," - a value from the source document, the unit of search. Used for building the inverted index"),"\n",s.createElement(t.li,null,s.createElement(t.strong,null,"index")," - a collection of documents, typically with the same schema."),"\n",s.createElement(t.li,null,s.createElement(t.strong,null,"inverted index")," - an internal data structure that maps terms to documents by ID, efficient for text-search queries."),"\n",s.createElement(t.li,null,s.createElement(t.strong,null,"stored fields")," - an array of all field values per field, in document order, stored in index in non-inverted manner. Efficient for getting many field values for a few docs."),"\n",s.createElement(t.li,null,s.createElement(t.strong,null,"doc values")," - Lucene’s column-stride field value storage. Efficient for getting a few field values for many docs. Useful for sorting and faceting."),"\n",s.createElement(t.li,null,s.createElement(t.strong,null,"index segments")," - Lucene indexes may be composed of multiple sub-indexes, or segments. Each segment is a fully independent index, which could be searched separately."),"\n"),"\n",s.createElement(t.h2,{id:"representing-data-with-lucene",style:{position:"relative"}},s.createElement(t.a,{href:"#representing-data-with-lucene","aria-label":"representing data with lucene permalink",className:"anchor before"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Representing data with Lucene"),"\n",s.createElement(t.h4,{id:"inverted-index",style:{position:"relative"}},s.createElement(t.a,{href:"#inverted-index","aria-label":"inverted index permalink",className:"anchor before"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Inverted Index"),"\n",s.createElement(t.p,null,"Inverted index is a data structure that maps terms (i.e. words or phrases) to the documents that contain them. The index is built by analyzing the text of the documents and extracting terms from them. The inverted index allows for fast and efficient searching by providing a way to look up documents that contain a specific term or set of terms. It also provides a way to rank the relevance of the search results by determining how many of the search terms match to a specific document."),"\n",s.createElement(t.p,null,"The inverted index is composed of two substructures:"),"\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,s.createElement(t.strong,null,"term dictionary")," - groups all the terms included in the documents in a ",s.createElement(t.strong,null,"sorted")," list."),"\n",s.createElement(t.li,null,s.createElement(t.strong,null,"postings list")," - creates a list of each term, indicating the documents where the term appears."),"\n"),"\n",s.createElement(n,{image:e.data.mdx.frontmatter.blogImages[0],alt:"Apache Lucene Inverted Index"}),"\n",s.createElement(t.p,null,"In the above example we can see three documents indexed into Lucene’s inverted index. Each of the document’s conten is analyzed (tokenized) into terms which are inserted into inverted index."),"\n",s.createElement(t.p,null,"Since the terms in the dictionary are sorted, we can quickly find a term (think binary search), and subsequently its occurrences in the postings-structure. This is contrary to a “forward index”, which lists terms related to a specific document."),"\n",s.createElement(t.h4,{id:"docvalues",style:{position:"relative"}},s.createElement(t.a,{href:"#docvalues","aria-label":"docvalues permalink",className:"anchor before"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"DocValues"),"\n",s.createElement(t.p,null,"Inverted index builds a mapping of terms found in all the documents in the index to a list of documents that the term appears in. This makes search very fast - since users search by terms, having a ready list of term-to-document values makes the query process faster."),"\n",s.createElement(t.p,null,"For other features that are associated with search, such as sorting, faceting, and highlighting, this approach is not very efficient. The faceting engine, for example, must look up each term that appears in each document that will make up the result set and pull the document IDs to build the facet list."),"\n",s.createElement(t.p,null,"DocValue fields are column-oriented fields with a document-to-value mapping built at index time - an uninverted (forward) index. This approach can make lookups for faceting, sorting, and grouping much faster, as we can retrieve fields for multiple docs with the single disk seek (utilizing the filesystem cache)."),"\n",s.createElement(t.p,null,"DocValues should be preferred over “stored fields” unless the complete document is being retrieved by a query."),"\n",s.createElement(t.h4,{id:"stored-fields",style:{position:"relative"}},s.createElement(t.a,{href:"#stored-fields","aria-label":"stored fields permalink",className:"anchor before"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Stored Fields"),"\n",s.createElement(t.p,null,"Similar to DocValues, Stored fields have been created to effectively persist values (differently to how inverted index does it) of the document fields, and then, retrieve them when needed."),"\n",s.createElement(t.p,null,"Stored fields are organised in a row manner. This means that, given a set of fields, for each document, the values of these fields are concatenated in a row. The rows are then stored sequentially on disk according to their Lucene doc id. Each row may have a different size depending on the number of fields defined for that document and data types (e.g. string or text fields have variable sizes). The pointers to each row are stored for allowing fast access to them."),"\n",s.createElement(t.p,null,"This technique is particularly useful if our search query needs to return complete documents (with all their fields) rather than just a few fields."),"\n",s.createElement(t.p,null,s.createElement(t.em,null,"DocValues")," and ",s.createElement(t.em,null,"Stored fields")," approached are not mutually exclusive settings, a given field, apart from being indexed into the inverted index, can have DocValues and Stored fields enabled. The queries that will be run against the index should determine which of these approaches is used. It’s important to keep in mind that both of approached are effectively duplicating data and storing them in a format suitable for specific the access pattern - so enabling both may result in a bloated index size."),"\n",s.createElement(t.h3,{id:"insertions",style:{position:"relative"}},s.createElement(t.a,{href:"#insertions","aria-label":"insertions permalink",className:"anchor before"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Insertions"),"\n",s.createElement(t.p,null,"When building inverted indexes, we need to prioritize things like: search speed, index compactness, indexing speed and the time it takes for new changes to become visible. Search speed and index compactness are related: when searching over a smaller index, less data needs to be processed, and more of it will fit in memory. Both, particularly compactness, come at the cost of indexing speed."),"\n",s.createElement(t.p,null,"To minimize index sizes, various compression techniques are used. For example, when storing the postings (which can get quite large), Lucene does tricks like delta-encoding - e.g. ",s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">[1, 9, 420]</code>'}})," is stored as ",s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">[1, 8, 411]</code>'}})," - so small numbers can be saved with less bytes."),"\n",s.createElement(t.p,null,"When new documents are added, the index changes are first buffered in memory. Eventually, the index files in their entirety, are flushed to disk. The written files make up an index segment."),"\n",s.createElement(n,{image:e.data.mdx.frontmatter.blogImages[1],alt:"Apache Lucene Segment Merges"}),"\n",s.createElement(t.p,null,"Lucene index segments are “write-once” files: once a segment has been written to permanent storage (to disk), it is never altered. This means that indexes are actually comprised of several files which are each subsets of the full index. To prevent eternal fragmentation of the index, segments are periodically merged. In the example above (",s.createElement(t.a,{href:"https://speakerdeck.com/elasticsearch/what-is-in-a-lucene-index?slide=11",target:"_blank",rel:"nofollow noopener noreferrer"},"source"),") we have two segments, each consisting of a single document. On the right side of the image, we can see a result of a segment merge - where 2 segments are merged to form a new segment."),"\n",s.createElement(t.h3,{id:"deletions",style:{position:"relative"}},s.createElement(t.a,{href:"#deletions","aria-label":"deletions permalink",className:"anchor before"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Deletions"),"\n",s.createElement(t.p,null,"For each segment, Lucene maintains a per-segment bitset (vector of 0 and 1s). Flipping a bit from 1 to 0 signals to Lucene that a document is deleted. All subsequent searches simply skip any deleted documents. It is not until segments are merged that the bytes consumed by deleted documents are reclaimed, as after the merge the resulting segment won’t contain deleted documents. Deleting the documents in-place in the existing segment would be far too costly."),"\n",s.createElement(t.h3,{id:"updates",style:{position:"relative"}},s.createElement(t.a,{href:"#updates","aria-label":"updates permalink",className:"anchor before"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Updates"),"\n",s.createElement(t.p,null,"Updating a previously indexed document is a “cheap” delete followed by a re-insertion of the document. This means that updating a document is even more expensive than adding it in the first place. Thus, storing things like rapidly changing values in a Lucene index is probably not a good idea – there is no in-place update of values."),"\n",s.createElement(t.h3,{id:"visualising-lucenes-segment-merges",style:{position:"relative"}},s.createElement(t.a,{href:"#visualising-lucenes-segment-merges","aria-label":"visualising lucenes segment merges permalink",className:"anchor before"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Visualising Lucene’s segment merges"),"\n",s.createElement(t.p,null,"Below there is a visualisation of how Lucene handles insertions, deletion and segment merges (taken from this great ",s.createElement(t.a,{href:"https://blog.mikemccandless.com/2011/02/visualizing-lucenes-segment-merges.html",target:"_blank",rel:"nofollow noopener noreferrer"},"blog post")," by Michael McCandless). Each segment is a bar, whose height is the size (in MB) of the segment. Segments on the left are the largest; as new segments are flushed, they appear on the right. The dark grey band on top of each segment shows the proportion of deletions in that segment."),"\n",s.createElement(t.img,{src:"/d354b960d0be76123bf1819fc104cf73/segment_merges.gif",alt:"Lucene segment merges"}),"\n",s.createElement(t.h3,{id:"lucenes-data-storage-architecture-pros-and-cons",style:{position:"relative"}},s.createElement(t.a,{href:"#lucenes-data-storage-architecture-pros-and-cons","aria-label":"lucenes data storage architecture pros and cons permalink",className:"anchor before"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Lucene’s data storage architecture: pros and cons"),"\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,"(-) Document insertions require writing a new segment. Which can be costly for single-document insertions. Therefore bulk inserts are preferred."),"\n",s.createElement(t.li,null,"(+) Segments are never modified in-place, so they are filesystem cache-friendly. Segments can be searched concurrently lock-free, with no risk of race conditions. It also allows for concurrent query execution."),"\n",s.createElement(t.li,null,"(+) The inverted index allows for fast and efficient searching by providing a way to look up documents that contain a specific term or set of terms."),"\n",s.createElement(t.li,null,"(+) Terms compression. Deduplication of terms within a segment, it can save a lot of space for very high-frequency terms."),"\n",s.createElement(t.li,null,"(+) Terms are uniquely identified by an ordinal, useful for sorting and faceting."),"\n",s.createElement(t.li,null,"(+) DocValues optimization can help with efficient sorting and faceting. Stored fields can help with retrieving whole documents."),"\n"),"\n",s.createElement(t.p,null,"Exploring Lucene series is continued in ",s.createElement(t.a,{href:"/tech-blog/exploring-apache-lucene-search-and-ranking/"},"Exploring Apache Lucene - Part 2: Search and Ranking")," and ",s.createElement(t.a,{href:"/tech-blog/exploring-apache-lucene-scale/"},"Exploring Apache Lucene - Part 3: Running at Scale"),"."))}var i=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,r.R)(),e.components);return t?s.createElement(t,e,s.createElement(l,e)):l(e)};var o=n(4794),c=n(8156),d=n.n(c),h=n(2532),m=n(39),u=n(56),p=n(2907),f=n(9379),g=n(5181),v=n(9787),b=n(4799),E=n(1863),y=n(7821),w=n(5765),x=n(4039),k=n(4310);const S={Link:o.Link,ImageGallery:f.A,ImageComponent:g.A,Container:E.mc,Column:E.VP,MakeItBigContainer:E.r,ThreePhotosContainer:E.Rq,LazyIframe:v.A,StatefulSliderPicker:x.a,StatefulBlockPicker:x.A};let L=function(e){function t(){return e.apply(this,arguments)||this}return(0,a.A)(t,e),t.prototype.render=function(){const{children:e}=this.props,t=this.props.data.mdx,n=d()(this.props,"data.site.siteMetadata.title"),a=d()(this.props,"data.site.siteMetadata.siteUrl");let{previous:l,next:i}=this.props.pageContext;const c=t.frontmatter.ogimage,f=c&&(0,h.d)(c),g=d()(t,"fields.category"),v=a+"/"+g+t.fields.slug,E={"@context":"https://schema.org","@type":"BlogPosting",headline:t.frontmatter.title,datePublished:t.frontmatter.date,url:v,author:[{"@type":"Person",name:"Jedr Blaszyk",url:"https://j.blaszyk.me/"}]};return s.createElement(u.A,{location:this.props.location,title:n,tocComponent:s.createElement(k.A,t.tableOfContents)},s.createElement(p.A,{title:t.frontmatter.title,description:t.frontmatter.spoiler,slug:t.fields.slug,image:f,structuredData:E}),s.createElement("main",null,s.createElement("article",{className:"post"},s.createElement("header",{id:"post-header"},s.createElement("h1",{style:{color:"var(--textTitle)",marginTop:"1.5rem",marginBottom:"0.5rem"}},t.frontmatter.title),s.createElement(o.Link,{style:{boxShadow:"none",textDecoration:"none",color:"var(--textLink)",fontFamily:"Montserrat, sans-serif"},to:"/tech-blog/",rel:"bookmark"},s.createElement("p",null,"Tech Blog")),s.createElement("p",{style:{...(0,w.hs)(-.2),display:"block",marginBottom:(0,w.di)(1),marginTop:(0,w.di)(-.8)}},(0,y.Wy)(t.frontmatter.date),s.createElement("span",{style:{margin:"0 0.15rem"}}," • "),(0,y.Bt)(t.fields.timeToRead.minutes))),s.createElement(r.x,{components:S},e))),s.createElement("aside",null,s.createElement("nav",null,s.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0,marginLeft:0}},s.createElement("li",null,l&&s.createElement(o.Link,{to:"/"+g+l.fields.slug,rel:"prev"},"← ",l.frontmatter.title)),s.createElement("li",null,i&&s.createElement(o.Link,{to:"/"+g+i.fields.slug,rel:"next"},i.frontmatter.title," →")))),s.createElement("h3",{style:{fontFamily:"Montserrat, sans-serif",marginTop:(0,w.di)(.25)}},s.createElement(o.Link,{style:{boxShadow:"none",textDecoration:"none",color:"var(--textLink)",fontSize:(0,w.di)(.8)},to:"/"},"Jedr's Blog")," • ",s.createElement(o.Link,{style:{boxShadow:"none",textDecoration:"none",color:"var(--textLink)",fontSize:(0,w.di)(.8)},to:"/tech-blog/"},"Tech Blog")),s.createElement("aside",{style:{width:"100%",backgroundColor:"var(--bg-header)",borderRadius:"1em",padding:"1.2em 0.6em",marginBottom:"1.5rem"}},s.createElement(m.A,{style:{marginBottom:0},size:"l"})),s.createElement(b.A,{url:v,id:t.fields.slug,title:t.frontmatter.title})))},t}(s.Component);function T(e){return s.createElement(L,e,s.createElement(i,e))}}}]);
//# sourceMappingURL=component---src-templates-tech-blog-post-js-content-file-path-content-tech-blog-exploring-apache-lucene-index-index-mdx-b0a0dee4fb3daa1d930d.js.map