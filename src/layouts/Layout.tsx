import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { UI_TEXT } from '@/config/constants';
import { useBlogStore } from '@/store';
import { useCategories } from '@/features/blog/hooks/useCategories';

export function Layout() {
  const { categories, loading, error, refetch } = useCategories();
  const { selectedCategory, searchQuery, setSelectedCategory, setSearchQuery } = useBlogStore();

  if (error) {
    return (
      <ErrorMessage
        title={UI_TEXT.FAILED_LOAD_CATEGORIES}
        message={error.message}
        onRetry={refetch}
      />
    );
  }

  if (loading) {
    return <LoadingSpinner message={UI_TEXT.LOADING} />;
  }

  return (
    <Sidebar
      categories={categories}
      selectedCategory={selectedCategory}
      onCategoryChange={setSelectedCategory}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    >
      <Outlet />
    </Sidebar>
  );
}

