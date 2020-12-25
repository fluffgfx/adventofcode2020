-- Helper Functions 
notNullTuple :: [(a1, [a2])] -> [(a1, [a2])]
notNullTuple = filter (not . null . snd)

joinHead :: (a, [a]) -> [a]
joinHead a = snd a ++ [fst a]

lookingFor x a = x - a

numsFromInput i = map read (lines i) :: [Int]

splitHalf l = splitAt ((length l + 1) `div` 2) l

-- IMPLEMENTATION 1:
-- O(n^2) complexity for part 1
-- O(n^4) complexity for part 2
-- A pretty hacky one, learning Haskell and trying to think functionally.
-- Want to improve on this complexity-wise.

-- O(n^2) complexity
tripleSumFinder n nums = 
    joinHead $
    head $
        notNullTuple (map (\a -> (a, sumFinder (n - a) nums)) nums)

-- O(n^2) complexity
sumFinder n nums =
    let allSeek = map (lookingFor n) nums
    in  filter (`elem` allSeek) nums

-- IMPLEMENTATION 2:
-- Merge sort O(n log n) avg and then +n?
-- Two pointers in array - one moves forward from 0, other backwards from end
-- Iterate until find two which sum to x

merge :: [a] -> [a] ->    [a]
merge    xs     []     =  xs
merge    []     ys     =  ys
merge    (x:xs) (y:ys) =  x : y : merge xs ys

mergeSort :: [Int] -> [Int]
mergeSort [a]    = [a]
mergeSort [a, b] =
    if a > b
        then [b, a]
    else [a, b]

sortedSumFinder :: Int -> [Int] -> (Int, Int)
sortedSumFinder _ [_]          = (0, 0)
sortedSumFinder n (first:rest) = do
    let (last:etc) = reverse rest
    let sum = first + last
    let recurser = sortedSumFinder n
    if sum == n
        then (first, last)
    else if sum > n
        then recurser $ first : reverse etc
    else recurser rest
    
sumFinder2 :: Int -> [Int] -> (Int, Int)
sumFinder2 n nums = do
    let sorted = mergeSort nums
    let _ = print sorted
    sortedSumFinder n sorted

tripleSumFinder2 n nums = map (\u -> sumFinder2 (n-u) nums) nums

-- IMPLEMENTATION UNIVERSAL
-- Parse input, essentially

handler x input = show $ x 2020 (numsFromInput input)

-- Usage: cat ./input.txt | ./main
main = interact $ handler sumFinder2